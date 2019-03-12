import React, { Component } from 'react'
import { connect } from 'react-redux'
import DatePicker from "react-datepicker"
import { save, resetFlgDetail, resetSaveSuccess, toggleModal } from '../../actions/shopAction'
import 'moment-timezone'
import moment from 'moment'
import * as jsPDF from 'jspdf'
import {
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Form,
  FormGroup,
  Input,
  Label,
  CustomInput,
  Button,
  } from 'reactstrap'

export class FormShop extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id:'',
      nameShop:'',
      createdAt:'',
      updatedAt: '',
      establishAt: new Date(),
      isEnabled: true,
      fullName:''
    }
  }
  renderFPD = () => {
    let view = [];
    let account = this.props.shopReducer.account;
    view.push("Ten Tai Khoan: " + account.username);
    view.push("Email: " + account.email);
    view.push("Mat Khau: " + this.props.shopReducer.password);
    return view;
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    await this.props.onSave(this.state);
  }
  handleReset = (e) => {
    e.preventDefault();
    this.resetForm();
  }
  resetForm = () => {
    this.setState({
      id:'',
      nameShop:'',
      createdAt:'',
      updatedAt: '',
      establishAt: new Date(),
      isEnabled: true
    })
  }
  changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (e.target.type === 'checkbox' & name === 'isEnabled') {
      this.setState({
        isEnabled: !this.state.isEnabled
      });
    } else {
      this.setState({
        [name]: value
      });
    }
  }
  handleChangeDate = establishAt => {
    this.setState({ establishAt: establishAt});
  }
  setShop = async () => {
    let shop = this.props.shopReducer.shop;
    await this.setState({
      id:shop.id,
      nameShop:shop.nameShop,
      createdAt:shop.createdAt,
      updatedAt:shop.updatedAt,
      establishAt:shop.establishAt,
      isEnabled: shop.isEnabled,
      fullName: shop.fullName
    });
  }
  componentDidUpdate = () => {
    if(this.props.shopReducer.flgDetail) {
      this.setShop();
      this.props.onResetFlgDetail();
    }
    if(this.props.shopReducer.flgSaveSucess) {
      let jsPDFDoc = new jsPDF();
      jsPDFDoc.text(this.renderFPD(),10,10);
      jsPDFDoc.save(this.props.shopReducer.account.username+'.pdf');
      this.resetForm();
      this.props.onResetSaveSuccess();
    }
  }
  showInfo = (e) => {
    e.preventDefault();
    this.props.onToggleModal();
  }
  toggleFormShopInfo = (e) => {
    e.preventDefault();
    this.setState({isOpenShopInfo:!this.state.isOpenShopInfo})
  }
  render() {
    return (
      <Form onSubmit={this.handleSubmit.bind(this)} onReset={this.handleReset.bind(this)}>
        <Card>
            <CardHeader>
              <i className="fas fa-store"></i>Chi tiết <strong>Cửa hàng</strong>
            </CardHeader>
            <CardBody>
              <Input type={'hidden'} name='id' id='id' value={this.state.id}/>
              <FormGroup row>
                <Col md="4"><Label htmlFor="nameShop">Tên Cửa Hàng</Label></Col>
                <Col md="8">
                  <Input 
                    type="text" 
                    id="nameShop" 
                    name="nameShop" 
                    placeholder="Tên Cửa Hàng" 
                    required 
                    onChange={this.changeHandler.bind(this)}
                    value={this.state.nameShop}/>
                  </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="4"><Label htmlFor="nameShop">Họ và Tên</Label></Col>
                <Col md="8">
                  <Input 
                    type="text" 
                    id="fullName" 
                    name="fullName" 
                    placeholder="Họ và Tên" 
                    required 
                    onChange={this.changeHandler.bind(this)}
                    value={this.state.fullName}/>
                  </Col>
              </FormGroup>
              <FormGroup row>
                  <Col md="4"><Label htmlFor="establishAt">Ngày Thành Lập</Label></Col>
                  <Col md="8">
                    <DatePicker
                      className="form-control"
                      selected={new Date(this.state.establishAt)}
                      dateFormat="dd/MM/yyyy"
                      onChange={this.handleChangeDate.bind(this)}/>
                  </Col>
              </FormGroup>
              <FormGroup row>
                <Col md='4'><Label htmlFor="createAt">Ngày Tạo</Label></Col>
                <Col md='8'>
                  <Input 
                      type="text" 
                      id="createAt" 
                      name="createAt" 
                      placeholder="Ngày Tạo" 
                      onChange={this.changeHandler.bind(this)}
                      value={moment(this.state.createdAt).format('DD/MM/YYYY')}
                      disabled/>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md='4'><Label htmlFor="updateAt">Ngày Cập Nhật</Label></Col>
                <Col md='8'>
                  <Input 
                    type="text" 
                    id="updateAt" 
                    name="updateAt" 
                    placeholder="Ngày Cập Nhật" 
                    disabled
                    onChange={this.changeHandler.bind(this)}
                    value={moment(this.state.createdAt).format('DD/MM/YYYY')}/>
                </Col>
              </FormGroup>
              <FormGroup row>
              <Col md='4'><Label htmlFor="isEnabled">Hoạt động</Label></Col>
              <Col md='8'>
                <CustomInput
                  type="switch"
                  id='isEnabled'
                  label='Hoạt động'
                  name='isEnabled'
                  checked={this.state.isEnabled}
                  onChange={this.changeHandler.bind(this)}
                  value = {this.state.isEnabled} />
                </Col>
              </FormGroup>
            </CardBody>
            <CardFooter className='text-right'>
            <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Lưu</Button>
            <Button type="reset" size="sm" color="danger" ><i className="fa fa-ban"></i> Làm Rỗng</Button>
          </CardFooter>
        </Card>
      </Form>
    )
  }
}

const mapStateToProps = (state) => ({
  shopReducer: state.shopReducer
})

const mapDispatchToProps = (dispatch) => ({
  onSave: (shop) => {
    return dispatch(save(shop))
  },
  onResetFlgDetail: () => {
    return dispatch(resetFlgDetail());
  },
  onResetSaveSuccess: () => {
    return dispatch(resetSaveSuccess());
  },
  onToggleModal: () => {
    return dispatch(toggleModal());
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(FormShop)
