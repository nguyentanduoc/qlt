import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table } from 'antd'
import Select from 'react-select'
import { getSpecUnit, save } from '../../../actions/importProductAction'
import DatePicker from 'react-datepicker'
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
  dataIndex: 'specUnit',
  key: 'specUnit',
}, { 
  title: 'Đơn Đơn giá',
  dataIndex: 'price',
  key: 'price'
}]
export class TableBuy extends Component {
  constructor(props){
    super(props);
    this.state = {
      data:[],
      dataView:[],
      modal: false,
      product: {},
      specUnit: {},
      amount:0,
      price: 0,
      createBillDate: new Date(),
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
        this.props.onGetSpecUnit(e.value);
        this.setState({product: e});
        break;
      
      case 'specUnit':
        this.setState({specUnit: e});
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
    let data = this.state.data;
    let dataView = this.state.dataView;
    data.push({
      product: this.state.product,
      specUnit: this.state.specUnit,
      amount:this.state.amount,
      price: this.state.price
    });
    dataView.push({
      product: this.state.product.label,
      specUnit: this.state.specUnit.label,
      amount:this.state.amount,
      price: this.state.price
    });
    this.setState({data: data, dataView: dataView});
  }
  handleChangeDate = (e) => {

  }
  onSave = (e) => {
    e.preventDefault();
    this.props.onSave(this.state.data);
  }
  render() {
    return (
      <div>
          <Row >
            <Col xs="6" md="6">
              <FormGroup>
                <Label htmlFor='dateCreated' className='pr-1'>Ngày Nhập</Label>
                <DatePicker
                      className="form-control"
                      selected={this.state.createBillDate}
                      dateFormat="dd/MM/yyyy"
                      onChange={this.handleChangeDate.bind(this)}
                      name='dateCreated'/>
              </FormGroup>
            </Col>
            <Col xs="6" md="6" className="text-right">
              <Button onClick={this.onAddproduct.bind(this)} size="sm" color="primary" className="btn-brand"><i className="fas fa-plus"></i><span>Thêm Sản Phẩm</span></Button>{' '}
              <Button size="sm" color="success" onClick={this.onSave.bind(this)}><i className="fa fa-dot-circle-o"></i>{' '}Lưu</Button>
            </Col>
          </Row>
            <Table dataSource={this.state.dataView} columns={columns} rowKey='product'/>
            
          <Modal isOpen={this.state.modal} toggle={this.toggle.bind(this)} >
            <ModalHeader toggle={this.toggle.bind(this)}>Thêm Sản Phẩm</ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label htmlFor=''>Sản Phẩm</Label>
                  <Select 
                    options={this.props.importRoductReducer.products}
                    onChange={this.handleSeletion.bind(this)}
                    isMulti = {false}
                    name="product"
                  />
              </FormGroup>
              <FormGroup>
                <Label htmlFor=''>Đơn Vị</Label>
                  <Select 
                      options={this.props.importRoductReducer.specUnitSelection}
                      onChange={this.handleSeletion.bind(this)}
                      isMulti = {false}
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
                  <Input 
                    type="number" 
                    id="price" 
                    name="price" 
                    onChange={this.changeHandler.bind(this)}
                    value={this.state.price}/>
                  <InputGroupAddon addonType="append">
                    <InputGroupText>VN Đồng</InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.addImport.bind(this)}>Lưu và Tiếp Tục</Button>{' '}
              <Button color="secondary" onClick={this.toggle.bind(this)}>Thoát</Button>
            </ModalFooter>
          </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  importRoductReducer: state.importRoductReducer
})

const mapDispatchToProps = (dispatch) => ({
  onGetSpecUnit: (id) => {
    return dispatch(getSpecUnit(id))
  },
  onSave: (data) => {
    return dispatch(save(data));
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(TableBuy)
