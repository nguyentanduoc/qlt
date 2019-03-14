import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table } from 'antd'
import Select from 'react-select'
import { getSpecUnit } from '../../../actions/importProductAction'
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

const { Column } = Table;

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
  render() {
    console.log(this.state.dataView)
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
              <Button onClick={this.onAddproduct.bind(this)} size="sm" color="primary" className="btn-brand mr-1 mb-1"><i className="fas fa-plus"></i><span>Thêm Sản Phẩm</span></Button>
            </Col>
          </Row>
            <Table dataSource={this.state.dataView}>
              <Column
                title="Tên sản phẩm"
                dataIndex="product"
                key="product"
              />
              <Column
                title="Số lượng"
                dataIndex="amount"
                key="amount"
              />
              <Column
                title="Đơn vị"
                dataIndex="specUnit"
                key="specUnit"
              />
              <Column
                title="Trị Giá"
                dataIndex="price"
                key="price"
              />
            </Table>
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
                <Label htmlFor='price'>Trị Giá</Label>
                <InputGroup>
                  <Input 
                    type="number" 
                    id="price" 
                    name="price" 
                    placeholder="Trị giá" 
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
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(TableBuy)
