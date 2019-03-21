import React, { Component } from 'react'
import { connect } from 'react-redux'
import DatePicker from 'react-datepicker'
import AlertCommon from '../../Common/AlertCommon'
import { Table } from 'antd'
import Select from 'react-select'
import { getAllProduct, getUnit, getAmountProduct } from '../../../actions/requestProductAction'
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
  InputGroupText
} from 'reactstrap'

const columns  = [{
  title: 'Tên Sản Phẩm',
  dataIndex: 'product',
  key: 'product',
},{
  title: 'Số Lượng',
  dataIndex: 'amount',
  key: 'amount',
},{
  title: 'Đơn Vị',
  dataIndex: 'unit',
  key: 'unit',
}]

export class TableRequest extends Component {
  constructor(props){
    super(props);
    this.state = {
      data:[],
      dataView:[],
      modal: false,
      product: {},
      unit: {},
      amount:0,
      createBillDate: new Date(),
      invalid: false
    }
  }
  onAddproduct = (e) => {
    e.preventDefault();
    this.toggle();
  }
  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  }
  handleSeletion = (e, selection) => {
    switch (selection.name) {
      case 'product':
        this.props.onGetUnit(e.value);
        this.props.onGetAmountProduct(e.value, this.props.authenReducer.branch.id);
        this.setState({product: e});
        break;
      
      default:
        break;
    }
  }
  changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    });
  }
  addImport = (e) => {
    e.preventDefault();
    this.setState({unit: this.props.requestReducer.unit});
    if(this.state.amount > this.props.requestReducer.amount) {
      this.setState({invalid: true});
    } else {
      let {data, dataView} = this.state;
      data.push({
        product: this.state.product,
        unit: this.state.unit,
        amount:this.state.amount
      });
      dataView.push({
        product: this.state.product.label,
        unit: this.state.unit.unitName,
        amount:this.state.amount
      });
      console.log(dataView);
      console.log(data);
      this.setState({data: data, dataView: dataView, invalid: false});
    }
  }
  addImportAndExit = (e) => {
    this.addImport(e);
    this.toggle();
  }
  onSave = (e) => {
    e.preventDefault();
    this.props.onSave(this.state.data, this.props.authenReducer.branch);
  }
  componentDidUpdate(){
    // if(this.props.importRoductReducer.saveSuccess){
    //   this.setState({ data:[], dataView:[]});
    //   this.props.onResetSaveSuccess();
    // }
    
  }
  componentWillMount(){
    this.props.onGetAllProduct(this.props.authenReducer.branch);
  }
  render() {
    const { products, unit, amount } = this.props.requestReducer;
    return (
      <div>
          <Row>
            <Col xs="4" md="4">
              <FormGroup>
                <Label htmlFor='dateCreated' className='pr-1'>Ngày Yêu Cầu</Label>
                <DatePicker
                      disabled={true}
                      className="form-control"
                      selected={this.state.createBillDate}
                      dateFormat="dd/MM/yyyy"
                      name='dateCreated'/>
              </FormGroup>
            </Col>
            <Col xs="4" md="4" className="text-right">
              <AlertCommon/>
            </Col>
            <Col xs="4" md="4" className="text-right">
              <Button onClick={this.onAddproduct.bind(this)} size="sm" color="primary" className="btn-brand"><i className="fas fa-plus"></i><span>Thêm Sản Phẩm</span></Button>{' '}
              <Button size="sm" color="success" onClick={this.onSave.bind(this)}><i className="fa fa-dot-circle-o"></i>{' '}Yêu Cầu</Button>
            </Col>
          </Row>
            <Table dataSource={this.state.dataView} columns={columns} rowKey='product'/>
          <Modal isOpen={this.state.modal} toggle={this.toggle.bind(this)} >
            <ModalHeader toggle={this.toggle.bind(this)}>Thêm Sản Phẩm</ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label htmlFor=''>Sản Phẩm</Label>
                  <Select 
                    options={products}
                    onChange={this.handleSeletion.bind(this)}
                    isMulti = {false}
                    name="product"
                  />
              </FormGroup>
                <Label htmlFor=''>Số Lượng</Label>
                  <InputGroup>
                    <Input invalid={this.state.invalid} name='amount' onChange={this.changeHandler.bind(this)} value={this.state.amount} type="number"/>
                    <FormFeedback>Xin lỗi! vui lòng nhập số lượng nhỏ hơn {amount}</FormFeedback>
                    <InputGroupAddon addonType="append">
                      <InputGroupText>
                        {unit.unitName}
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
              <FormGroup>
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

})

const mapDispatchToProps = (dispatch) => ({
  onGetAllProduct: (branch) => {
    return dispatch(getAllProduct(branch));
  },
  onGetUnit: (id) => {
     return dispatch(getUnit(id))
  },
  onSave: (data, branch) => {
    // return dispatch(save(data, branch));
  },
  onResetSaveSuccess: () => {
    // return dispatch(resetSaveSuccess());
  },
  onGetAmountProduct: (id, branchId) => {
    return dispatch(getAmountProduct(id, branchId))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(TableRequest)
