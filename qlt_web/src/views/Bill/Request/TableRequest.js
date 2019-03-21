import React, { Component } from 'react'
import { connect } from 'react-redux'
import DatePicker from 'react-datepicker'
import AlertCommon from '../../Common/AlertCommon'
import { Table } from 'antd'
import Select from 'react-select'
import { getAllProduct } from '../../../actions/requestProductAction'
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
  Input
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
}]

export class TableRequest extends Component {
  constructor(props){
    super(props);
    this.state = {
      data:[],
      dataView:[],
      modal: false,
      product: {},
      specUnit: {},
      amount:0,
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
      amount:this.state.amount
    });
    dataView.push({
      product: this.state.product.label,
      specUnit: this.state.specUnit.label,
      amount:this.state.amount
    });
    this.setState({data: data, dataView: dataView});
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
    if(this.props.importRoductReducer.saveSuccess){
      this.setState({ data:[], dataView:[]});
      this.props.onResetSaveSuccess();
    }
  }
  componentWillMount(){
    this.props.onGetAllProduct();
  }
  render() {
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
  importRoductReducer: state.importRoductReducer,
  authenReducer: state.auth,
})

const mapDispatchToProps = (dispatch) => ({
  onGetAllProduct: () => {
    return dispatch(getAllProduct());
  },
  onGetSpecUnit: (id) => {
    // return dispatch(getSpecUnit(id))
  },
  onSave: (data, branch) => {
    // return dispatch(save(data, branch));
  },
  onResetSaveSuccess: () => {
    // return dispatch(resetSaveSuccess());
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(TableRequest)