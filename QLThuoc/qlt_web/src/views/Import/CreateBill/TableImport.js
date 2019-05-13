import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Table} from 'antd';
import Select from 'react-select';
import {getSpecUnit, resetSaveSuccess, save} from '../../../actions/importProductAction';
import DatePicker from 'react-datepicker';
import AlertCommon from '../../Common/AlertCommon';
import {resetAlert} from '../../../actions/alertAction';
import NumberFormat from 'react-number-format';
import _ from 'lodash';
import {
  Alert,
  Button,
  Col,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row
} from 'reactstrap';

const columns = [{
  title: 'Tên Sản Phẩm',
  dataIndex: 'product',
  key: 'product',
}, {
  title: 'Số Lượng',
  dataIndex: 'amount',
  key: 'amount',
}, {
  title: 'Đơn Vị',
  dataIndex: 'specUnit',
  key: 'specUnit',
}, {
  title: 'Đơn Đơn giá',
  dataIndex: 'price',
  key: 'price'
}];

export class TableBuy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dataView: [],
      modal: false,
      product: {},
      specUnit: {},
      amount: 0,
      price: 0,
      createBillDate: new Date(),
      isError: false
    }
  }

  onAddProduct = (e) => {
    e.preventDefault();
    this.toggle();
  };
  toggle = () => {
    this.setState({
      modal: !this.state.modal,
      isError: false
    });
  };
  handleSelection = (e, selection) => {
    switch (selection.name) {
      case 'product':
        this.props.onGetSpecUnit(e.value);
        this.setState({product: e});
        break;

      case 'specUnit':
        this.setState({specUnit: e});
        break;

      default:
        break;
    }
  };
  changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    });
  };
  addImport = (e) => {
    e.preventDefault();
    if (this.state.product && this.state.specUnit) {
      let data = this.state.data;
      let dataView = this.state.dataView;
      const compare = _.find(data, (o) => o.product.value === this.state.product.value);
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          if (typeof (compare) === 'undefined') {
            data.push({
              product: this.state.product,
              specUnit: this.state.specUnit,
              amount: values.amount,
              price: values.price
            });
            dataView.push({
              product: this.state.product.label,
              specUnit: this.state.specUnit.label,
              amount: values.amount,
              price: values.price
            });
            const total = this.state.total;
            this.setState({
              data: data,
              dataView: dataView,
              isError: false,
              total: total + values.amount * values.price
            });
          } else {
            this.setState({isError: true, messageError: "Sẩn phẩm đã được nhập"})
          }
        }
      });
      dataView.push({
        product: this.state.product.label,
        specUnit: this.state.specUnit.label,
        amount: this.state.amount,
        price: parseFloat(price)
      });
      this.setState({data: data, dataView: dataView, isError: false});
    } else {
      this.setState({isError: true})
    }
  };
  addImportAndExit = (e) => {
    this.addImport(e);
    this.toggle();
  };
  onSave = (e) => {
    e.preventDefault();
    this.props.onSave(this.state.data, this.props.authenticationReducer.branch);
  };

  componentDidUpdate() {
    if (this.props.importProductReducer.saveSuccess) {
      this.setState({data: [], dataView: []});
      this.props.onResetSaveSuccess();
    }
  };

  componentWillUnmount() {
    this.props.onResetAlert();
  };

  unitPrice = (specUnitChoose, price) => {
    const {product} = this.props.importProductReducer;
    const {specUnits} = product;
    const specUnit = _.find(specUnits, function (o) {
      return o.id === specUnitChoose.value;
    });
    if (specUnit.unitIn.id === product.unit.id) {
      return price;
    } else {
      if (specUnitChoose.value === specUnit.unitIn.id) {
        return price / specUnit.amount
      } else {
        return price * specUnit.amount
      }
    }
  };
  handleDelete = (record) => {
    let {dataView, data} = this.state;
    _.remove(dataView, function (data) {
      if (data.product === record.product) {
        return data;
      }
    });
    _.remove(data, function (data) {
      if (data.product.label === record.product) {
        return data;
      }
    });
    this.setState({
      dataView: dataView,
      data: data
    });
  };
  createNewSpec = () => {
    this.setState({
      modalSpec: !this.state.modalSpec
    })
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    const {product} = this.props.importProductReducer;
    const unitOfProduct = (product && product.unit && product.unit.unitName) ? product.unit.unitName : "";
    return (
      <div>
        <Row>
          <Col xs="4" md="4">
            <FormGroup>
              <Label htmlFor='dateCreated' className='pr-1'>Ngày Nhập</Label>
              <DatePicker
                dropdownMode={'scroll'}
                className="form-control text-right"
                selected={this.state.createBillDate}
                dateFormat="dd/MM/yyyy"
                onChange={() => {
                }}
                name='dateCreated' disabled={true}/>
            </FormGroup>
          </Col>
          <Col xs="4" md="4" className="text-right">
            <AlertCommon/>
          </Col>
          <Col xs="4" md="4" className="text-right">
            <Button onClick={this.onAddProduct.bind(this)} size="sm" color="primary" className="btn-brand">
              <i className="fas fa-plus"/><span>Thêm Sản Phẩm</span></Button>{' '}
            <Button size="sm" color="success" onClick={this.onSave.bind(this)} disabled={this.state.data.length <= 0}>
              <i className="fa fa-dot-circle-o"/>{' '}Lưu</Button>
          </Col>
        </Row>
        <Table dataSource={this.state.dataView} columns={columns} rowKey='product' bordered={true}/>
        <Modal isOpen={this.state.modal} toggle={this.toggle.bind(this)}>
          <Form>
            <ModalHeader toggle={this.toggle.bind(this)}>Thêm Sản Phẩm</ModalHeader>
            <ModalBody>
              <Alert color="danger" isOpen={this.state.isError}>
                {this.state.messageError}
              </Alert>
              <FormGroup>
                <Label htmlFor=''>Sản Phẩm</Label>
                <Select
                  options={this.props.importProductReducer.products}
                  onChange={this.handleSelection.bind(this)}
                  isMulti={false}
                  name="product"
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor='specUnit'>Đơn Vị</Label>
                <Select
                  options={this.props.importProductReducer.specUnitSelection}
                  onChange={this.handleSelection.bind(this)}
                  isMulti={false}
                  name="specUnit"
                />
                <div className={'text-right'}>
                  <Button color="success" size={'sm'} onClick={this.createNewSpec} disabled={!this.state.product.value}><i
                    className="fas fa-plus"/></Button>
                </div>
              </FormGroup>
              <FormGroup>
                <Form.Item label="Số lượng">
                  {getFieldDecorator('amount', {
                    initialValue: 0,
                    rules: [{
                      required: true, message: 'Hãy nhập số lượng',
                    }, {
                      validator: (rule, value, callback) => {
                        if (value <= 0) {
                          callback("Số lượng lớn hơn 0");
                        } else {
                          callback();
                        }
                      },
                    }],
                  })(
                    <InputNumber
                      style={{width: '100%'}}
                      className={'form-control'}
                    />
                  )}
                </Form.Item>
              </FormGroup>
              <FormGroup>
                <Form.Item label={`Giá Đơn vị chuẩn - ${unitOfProduct} `}>
                  {getFieldDecorator('price', {
                    initialValue: 0,
                    rules: [{
                      required: true, message: 'Hãy nhập đơn giá',
                    }, {
                      validator: (rule, value, callback) => {
                        if (value <= 0) {
                          callback("Đơn giá lớn hơn 0");
                        } else {
                          callback();
                        }
                      },
                    }],
                  })(
                    <InputNumber
                      style={{width: '100%'}}
                      className={'form-control'}
                      formatter={value => `₫ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      parser={value => value.replace(/\₫\s?|(,*)/g, '')}
                    />
                  )}
                </Form.Item>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.addImport.bind(this)}>Lưu và Tiếp Tục</Button>{' '}
              <Button color="warning" onClick={this.addImportAndExit.bind(this)}>Lưu và Thoát</Button>{' '}
              <Button color="secondary" onClick={this.toggle.bind(this)}>Thoát</Button>
            </ModalFooter>
          </Form>
        </Modal>
        <ModalCreateSpec
          isOpen={this.state.modalSpec}
          toggle={this.createNewSpec}
          productId={this.state.product.value}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  importProductReducer: state.importProductReducer,
  authenticationReducer: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  onGetSpecUnit: (id) => {
    return dispatch(getSpecUnit(id))
  },
  onSave: (data, branch) => {
    return dispatch(save(data, branch));
  },
  onResetSaveSuccess: () => {
    return dispatch(resetSaveSuccess());
  },
  onResetAlert: () => {
    return dispatch(resetAlert());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TableBuy)
