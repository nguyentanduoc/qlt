import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card, CardBody, CardHeader, Row, Col} from 'reactstrap';
import DetailBillExport from "./DetailBillExport";
import {Form, Input, Button} from 'antd';
import {getAllProduct, getSpecUnit, setListDetail, getInventory} from '../../../actions/exportAction';
import Select from 'react-select';

class CreateBill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      amount: 0,
      specUnit: {},
      dataView: [],
      dataSubmit: [],
      priceHistory: {}
    }
  }

  componentWillMount() {
    const {branch} = this.props.authenticationReducer;
    this.props.onGetAllProduct(branch);
  }

  handleSelection = (option, event) => {
    const {product} = this.state;
    const {branch} = this.props.authenticationReducer;
    switch (event.name) {
      case 'product':
        this.props.onGetSpecUnit(option.value, branch.id);
        this.setState({product: option});
        break;
      case 'specUnit':
        this.props.onGetInventory({
          productId: product.value,
          specUnitId: option.value,
          branchId: branch.id
        });
        this.setState({specUnit: option});
        break;
      default:
        break;
    }
  };
  validateAmount = (rule, value, callback) => {
    const {inventory} = this.props.exportReducer;
    if (value && value > inventory) {
      callback('Số lượng vượt mức');
    } else {
      callback();
    }
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const {priceHistory} = this.props.exportReducer;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSetListDetail({
          product: this.state.product,
          specUnit: this.state.specUnit,
          price: values.price,
          amount: values.amount,
          priceHistory: priceHistory
        });
      }
    });
  };

  render() {
    const {productSelection, specUnits, inventory, price} = this.props.exportReducer;
    const {getFieldDecorator} = this.props.form;
    return (
      <Card>
        <CardHeader>
          Tạo Hóa Đơn Bán Hàng
        </CardHeader>
        <CardBody>
          <Button htmlType={'button'} onClick={this.printPdf}> click</Button>
          <Row>
            <Col md={4}>
              <Card>
                <CardBody>
                  <Row>
                    <Col md={6}>
                      <Form.Item label={"Số lượng tồn"}>
                        {getFieldDecorator('input-number', {initialValue: inventory})(
                          <Input disabled={true}/>
                        )}
                      </Form.Item>
                    </Col>
                    <Col md={6}>
                      <Form.Item label={"Giá sản phẩm"}>
                        {getFieldDecorator('price', {initialValue: price})(
                          <Input disabled={true} className={'text-right'}/>
                        )}
                      </Form.Item>
                    </Col>
                  </Row>
                  <Form>
                    <Form.Item label={"Sản Phẩm"}>
                      <Select
                        options={productSelection}
                        onChange={this.handleSelection}
                        isMulti={false}
                        name="product"
                        isDisabled={productSelection.length <= 0}
                      />
                    </Form.Item>
                    <Form.Item label={"Đơn Vị"}>
                      <Select
                        options={specUnits}
                        onChange={this.handleSelection}
                        isMulti={false}
                        name="specUnit"
                        isDisabled={specUnits.length <= 0}
                      />
                    </Form.Item>
                    <Form.Item label={"Số Lượng"}>
                      {getFieldDecorator('amount', {
                        rules: [{
                          required: true, message: 'Hãy nhập số lượng',
                        }, {
                          validator: this.validateAmount,
                        }],
                      })(
                        <Input type="number" disabled={this.state.product === null && this.state.specUnit === null}/>
                      )}
                    </Form.Item>
                    <Button type="primary" htmlType="submit" onClick={this.handleSubmit}>Thêm Sản Phẩm</Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
            <Col md={8}>
              <DetailBillExport/>
            </Col>
          </Row>
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = (state) => ({
  authenticationReducer: state.auth,
  exportReducer: state.exportReducer
});
const mapDispatchToProps = (dispatch) => ({
  onGetAllProduct: (branch) => (
    dispatch(getAllProduct(branch))
  ),
  onGetSpecUnit: (productId, branchId) => (
    dispatch(getSpecUnit(productId, branchId))
  ),
  onSetListDetail: (data) => (
    dispatch(setListDetail(data))
  ),
  onGetInventory: (data) =>
    (dispatch(getInventory(data)))
});
const createBillForm = Form.create({name: 'register'})(CreateBill);
export default connect(mapStateToProps, mapDispatchToProps)(createBillForm);
