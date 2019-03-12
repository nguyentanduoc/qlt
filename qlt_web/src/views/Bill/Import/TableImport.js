import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table, Button } from 'antd'
import Select from 'react-select'
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
      modal: false
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
  handleSeletion = () => {
    
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
                <Label htmlFor=''></Label>
                  <Select 
                    options={this.props.importRoductReducer.products}
                    onChange={this.handleSeletion.bind(this)}
                    isMulti = {false}
                    name="branchs"
                  />
              </FormGroup>
              <FormGroup>
                <Label htmlFor=''></Label>
                <Input name=''/>
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

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(TableBuy)
