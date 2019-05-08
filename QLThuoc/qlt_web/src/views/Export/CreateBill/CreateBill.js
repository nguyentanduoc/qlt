import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card, CardBody, CardHeader, Row, Col, CustomInput} from 'reactstrap';
import DetailBillExport from "./DetailBillExport";
import {Form, Input, Button} from 'antd';
import {getAllProduct, getSpecUnit, setListDetail, getInventory, clearDetail} from '../../../actions/exportAction';
import Select from 'react-select';
import _ from 'lodash';
import {showAlertErrorAndReset} from '../../../actions/alertAction';
import AlertCommon from '../../Common/AlertCommon'
import ExportBillToPdf from './ExportBillToPDF';
import NumberFormat from "react-number-format";

class CreateBill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      amount: 0,
      specUnit: {},
      dataView: [],
      dataSubmit: [],
      priceHistory: {},
      isShare: false
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
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const {priceHistory, dataSubmits} = this.props.exportReducer;
        const compare = _.find(dataSubmits, (o) => this.state.product.value === o.product.value)
        if (typeof (compare) === 'undefined') {
          this.props.onSetListDetail({
            product: this.state.product,
            specUnit: this.state.specUnit,
            price: values.price,
            amount: values.amount,
            priceHistory: priceHistory
          });
        } else {
          this.props.onShowAlertErrorAndReset("Sản Phẩm đã được thêm vào trước đó");
        }
      }
    });
  };
  changeHandler = () => {
    const {dataViews, dataSubmits} = this.props.exportReducer;
    if (dataViews.length > 0 || dataSubmits.length > 0)
      this.props.onClearDetail();
    this.setState({isShare: !this.state.isShare});
  };

  render() {
    const {productSelection, specUnits, price, inventory, priceShare} = this.props.exportReducer;
    const {getFieldDecorator} = this.props.form;
    return (
      <Card>
        <CardHeader>
          Tạo Hóa Đơn Bán Hàng
          <div className="card-header-actions">
            <CustomInput
              type="switch"
              id='isMain'
              label='Bán sĩ'
              name='isMain'
              checked={this.state.isShare}
              onChange={this.changeHandler.bind(this)}
            />
          </div>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md={4}>
              <Card>
                <CardBody>
                  <AlertCommon/>
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
                        {getFieldDecorator('price', {initialValue: this.state.isShare ? priceShare : price})(
                          <NumberFormat displayType={'input'} thousandSeparator={true} value={price}
                          className={'form-control text-right'} disabled={true}/>
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
                        <Input type="number"
                               disabled={typeof (this.state.product.value) === 'undefined' || typeof (this.state.specUnit.value) === 'undefined'}/>
                      )}
                    </Form.Item>
                    <Button type="primary" htmlType="submit" onClick={this.handleSubmit}>Thêm Sản Phẩm</Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
            <Col md={8}>
              <DetailBillExport isShare={this.state.isShare}/>
              <ExportBillToPdf/>
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
  onGetAllProduct: (branch) => dispatch(getAllProduct(branch)),
  onGetSpecUnit: (productId, branchId) => dispatch(getSpecUnit(productId, branchId)),
  onSetListDetail: (data) => dispatch(setListDetail(data)),
  onGetInventory: (data) => dispatch(getInventory(data)),
  onShowAlertErrorAndReset: (message) => dispatch(showAlertErrorAndReset(message)),
  onClearDetail: () => dispatch(clearDetail())
});
const createBillForm = Form.create({name: 'register'})(CreateBill);
export default connect(mapStateToProps, mapDispatchToProps)(createBillForm);
