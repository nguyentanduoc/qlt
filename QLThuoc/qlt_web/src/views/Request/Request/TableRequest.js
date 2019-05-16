import React, {Component} from 'react'
import {connect} from 'react-redux'
import DatePicker from 'react-datepicker'
import {Table} from 'antd'
import Select from 'react-select'
import {getAllProduct, getUnit, getAmountProduct, save, resetSaveSuccess} from '../../../actions/requestProductAction'
import {resetAlert} from '../../../actions/alertAction';
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
  FormFeedback,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Card,
  CardHeader,
  CardBody
} from 'reactstrap'
import CardFooter from "reactstrap/es/CardFooter";
import mathRound from "../../../helpers/decimalAdjustment";
import NumberFormat from "react-number-format";

const columns = [
  {
    title: 'Tên Sản Phẩm',
    dataIndex: 'product',
    key: 'product',
  }, {
    title: 'Số Lượng',
    dataIndex: 'amount',
    key: 'amount',
  }, {
    title: 'Đơn Vị',
    dataIndex: 'unit',
    key: 'unit',
  },
  {
    title: 'Giá',
    dataIndex: 'price',
    key: 'price',
  }
];

export class TableRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dataView: [],
      modal: false,
      product: {},
      unit: {},
      amount: 0,
      price: 0,
      createBillDate: new Date(),
      invalid: false,
      noteRequest: '',
      total: 0
    }
  }

  onAddProduct = (e) => {
    e.preventDefault();
    this.toggle();
  };
  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };
  handleSelections = (e, selection) => {
    switch (selection.name) {

      case 'product':
        this.props.onGetUnit(e.value);
        this.props.onGetAmountProduct(e.value, this.props.authenReducer.branch.id);
        this.setState({product: e});
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

  addImport = async (e) => {
    const {priceHistory} = this.props.requestReducer;
    e.preventDefault();
    await this.setState({unit: this.props.requestReducer.unit});
    if (this.state.amount > this.props.requestReducer.amount) {
      this.setState({invalid: true});
    } else {
      let {data, dataView} = this.state;
      data.push({
        product: this.state.product,
        unit: this.state.unit,
        amount: this.state.amount,
        price: priceHistory.price
      });
      dataView.push({
        product: this.state.product.label,
        unit: this.state.unit.unitName,
        amount: this.state.amount,
        price: priceHistory.price
      });
      this.setState({
        data: data,
        dataView: dataView,
        invalid: false,
        total: this.state.total + (priceHistory.price * this.state.amount)
      });
    }
  };

  addImportAndExit = (e) => {
    this.addImport(e).then(() => {
      this.toggle();
    });
  };

  onSave = (e) => {
    e.preventDefault();
    this.props.onSave(this.state.data, this.props.authenReducer.branch, this.state.noteRequest);
  }

  componentDidUpdate() {
    if (this.props.requestReducer.flgSaveSuccess) {
      this.setState({data: [], dataView: []});
      this.props.onResetSaveSuccess();
    }
  }

  componentWillMount() {
    this.props.onGetAllProduct(this.props.authenReducer.branch);
  }

  componentWillUnmount() {
    this.props.onResetAlert();
  }

  checkEmpty = (str) => {
    return (!str || 0 === str.length);
  };

  render() {
    const {products, unit, amount, priceHistory} = this.props.requestReducer;
    const {total} = this.state;
    return (
      <div>
        <Row>
          <Col xs={'8'} md={'8'}>
            <Card>
              <CardHeader>
                <strong>Chi Tiết Yêu Cầu</strong>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md={6}>
                    <Button onClick={this.onAddProduct.bind(this)} size="sm" color="primary" className="btn-brand mb-1">
                      <i className="fas fa-plus"/><span>Thêm Sản Phẩm</span>
                    </Button>
                  </Col>
                  <FormGroup row className={'col-md-6 text-right'}>
                    <Label md={6}>Thành Tiền:</Label>
                    <NumberFormat displayType={'input'} thousandSeparator={true} value={mathRound(total, -3)}
                                  className={'form-control text-right col-md-6'} disabled={true}/>
                  </FormGroup>
                </Row>
                <Table dataSource={this.state.dataView} columns={columns} rowKey='product' bordered={true}/>
              </CardBody>
            </Card>
          </Col>
          <Col xs={'4'} md={'4'}>
            <Card>
              <CardHeader>
                <strong>Thông tin Yêu Cầu</strong>
              </CardHeader>
              <CardBody>
                <FormGroup>
                  <Label htmlFor='dateCreated' className='pr-1'>Ngày Yêu Cầu</Label>
                  <br/>
                  <DatePicker
                    dropdownMode={'scroll'}
                    disabled={true}
                    className="form-control"
                    selected={this.state.createBillDate}
                    dateFormat="dd/MM/yyyy"
                    name='dateCreated'/>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor='noteRequest' className='pr-1'>Ghi Chú Phiếu Yêu Cầu</Label>
                  <Input
                    type="textarea"
                    name='noteRequest' id='noteRequest'
                    placeholder="Ghi chú yêu cầu"
                    required
                    onChange={this.changeHandler.bind(this)}
                    value={this.checkEmpty(this.state.noteRequest) === true ? "" : this.state.noteRequest}/>
                </FormGroup>
              </CardBody>
              <CardFooter>
                <Button size="sm" color="success" onClick={this.onSave.bind(this)}>
                  <i className="fa fa-dot-circle-o"/>{' '}Yêu Cầu</Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
        <Modal isOpen={this.state.modal} toggle={this.toggle.bind(this)}>
          <ModalHeader toggle={this.toggle.bind(this)}>Thêm Sản Phẩm</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label htmlFor='product'>Sản Phẩm</Label>
              <Select
                options={products}
                onChange={this.handleSelections.bind(this)}
                isMulti={false}
                name="product"
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor='price'>Giá</Label>
              <Input name={'price'} disabled={true} value={priceHistory ? priceHistory.price : ''}/>
            </FormGroup>
            <FormGroup>
              <Label htmlFor='amount'>Số Lượng</Label>
              <InputGroup>
                <Input invalid={this.state.invalid} name='amount' onChange={this.changeHandler.bind(this)}
                       value={this.state.amount} type="number"/>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    {unit.unitName}
                  </InputGroupText>
                </InputGroupAddon>
                <FormFeedback>Xin lỗi! vui lòng nhập số lượng nhỏ hơn {amount}</FormFeedback>
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
  requestReducer: state.requestReducer,
  authenReducer: state.auth,

});

const mapDispatchToProps = (dispatch) => ({
  onGetAllProduct: (branch) => {
    return dispatch(getAllProduct(branch));
  },
  onGetUnit: (id) => {
    return dispatch(getUnit(id))
  },
  onSave: (data, branch, noteRequest) => {
    return dispatch(save(data, branch, noteRequest));
  },
  onResetSaveSuccess: () => {
    return dispatch(resetSaveSuccess());
  },
  onGetAmountProduct: (id, branchId) => {
    return dispatch(getAmountProduct(id, branchId))
  },
  onResetAlert: () => {
    return dispatch(resetAlert());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TableRequest)
