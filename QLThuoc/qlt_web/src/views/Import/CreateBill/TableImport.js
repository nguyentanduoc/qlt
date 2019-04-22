import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Table} from 'antd';
import Select from 'react-select';
import {getSpecUnit, save, resetSaveSuccess} from '../../../actions/importProductAction';
import DatePicker from 'react-datepicker';
import AlertCommon from '../../Common/AlertCommon';
import {resetAlert} from '../../../actions/alertAction';
import NumberFormat from 'react-number-format';
import _ from 'lodash';
import {
  Button,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Alert
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
    let data = this.state.data;
    let dataView = this.state.dataView;
    const compare = _.find(data, (o) => o.product.value === this.state.product.value);
    let price =  this.state.price.replace(new RegExp(',', 'g'), '');
    if (typeof (compare) === 'undefined') {
      data.push({
        product: this.state.product,
        specUnit: this.state.specUnit,
        amount: this.state.amount,
        price: parseFloat(price)
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

  render() {
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
          <ModalHeader toggle={this.toggle.bind(this)}>Thêm Sản Phẩm</ModalHeader>
          <ModalBody>
            <Alert color="danger" isOpen={this.state.isError}>
              Sẩn phẩm đã được nhập
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
              <Label htmlFor=''>Đơn Vị</Label>
              <Select
                options={this.props.importProductReducer.specUnitSelection}
                onChange={this.handleSelection.bind(this)}
                isMulti={false}
                name="specUnit"
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor=''>Số Lượng</Label>
              <Input name='amount' onChange={this.changeHandler.bind(this)} value={this.state.amount} type="number"/>
            </FormGroup>
            <FormGroup>
              <Label htmlFor='price'>Đơn Giá</Label>
              <InputGroup>
                <NumberFormat
                  value={this.state.price}
                  className={'form-control'}
                  thousandSeparator={true}
                  name="price"
                  onChange={this.changeHandler.bind(this)}
                  fixedDecimalScale={true}/>
                <InputGroupAddon addonType="append">
                  <InputGroupText>VN Đồng</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.addImport.bind(this)}>Lưu và Tiếp Tục</Button>{' '}
            <Button color="warning" onClick={this.addImportAndExit.bind(this)}>Lưu và Thoát</Button>{' '}
            <Button color="secondary" onClick={this.toggle.bind(this)}>Thoát</Button>
          </ModalFooter>
        </Modal>
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
