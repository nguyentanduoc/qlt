import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table, Button } from 'antd'
import Select from 'react-select'
import { getSpecUnit } from '../../../actions/importProductAction'
import {
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input
} from 'reactstrap'

const { Column } = Table;

export class TableBuy extends Component {
  constructor(props){
    super(props);
    this.state = {
      data:[],
      modal: false,
      product: {},
      specUnit: {},
      amount:0
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
  render() {
    return (
      <div>
          <Row>
            <Button onClick={this.onAddproduct.bind(this)}>Thêm Sản Phẩm</Button>
          </Row>
          <Row>
            <Col md='12'>
              <Table dataSource={this.state.data}>
                <Column
                  title="Tên Thuốc"
                  dataIndex="productName"
                  key="productName"
                />
                <Column
                  title="Số lượng"
                  dataIndex="amount"
                  key="amount"
                />
                <Column
                  title="Đơn vị"
                  dataIndex="unit"
                  key="unit"
                />
              </Table>
            </Col>
          </Row>
          <Modal isOpen={this.state.modal} toggle={this.toggle.bind(this)} >
            <ModalHeader toggle={this.toggle.bind(this)}>Modal title</ModalHeader>
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
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.toggle.bind(this)}>Do Something</Button>{' '}
              <Button color="secondary" onClick={this.toggle.bind(this)}>Cancel</Button>
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
