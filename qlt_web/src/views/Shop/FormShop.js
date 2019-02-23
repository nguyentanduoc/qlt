import React, { Component } from 'react'
import { connect } from 'react-redux'
import DatePicker from "react-datepicker"
import { save, resetFlgDetail } from '../../actions/shopAction'
import 'moment-timezone'
import moment from 'moment'
import {
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Badge,
  Form,
  FormGroup,
  Input,
  Label,
  CustomInput,
  Button,
  Row
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
      isEnabled: true
    }
  }

  handleSubmit = (e) => {
    console.log(this.state);
    e.preventDefault();
    this.props.onSave(this.state);
  }
  handleReset = (e) => {
    e.preventDefault();
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
      isEnabled: shop.isEnabled
    });
    console.log(this.state);
  }
  componentDidUpdate = () => {
    if(this.props.shopReducer.flgDetail) {
      this.setShop();
      this.props.onResetFlgDetail();
    }
  }
  render() {
    console.log(new Date(this.state.establishAt));
    return (
      <Form onSubmit={this.handleSubmit.bind(this)} onReset={this.handleReset.bind(this)}>
        <Card>
            <CardHeader>
              <i className="fas fa-store"></i>Chi tiết <strong>Cửa hàng</strong>
            </CardHeader>
            <CardBody>
              <Input type={'hidden'} name='id' id='id' value={this.state.id}/>
              <FormGroup>
                <Label htmlFor="nameShop">Tên Cửa Hàng</Label>
                <Input 
                  type="text" 
                  id="nameShop" 
                  name="nameShop" 
                  placeholder="Tên Cửa Hàng" 
                  required 
                  onChange={this.changeHandler.bind(this)}
                  value={this.state.nameShop}/>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col><Label htmlFor="establishAt">Ngày Thành Lập</Label></Col>
                  <Col>
                    <DatePicker
                      className="form-control"
                      selected={new Date(this.state.establishAt)}
                      dateFormat="dd/MM/yyyy"
                      onChange={this.handleChangeDate.bind(this)}/>
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="createAt">Ngày Tạo</Label>
                <Input 
                  type="text" 
                  id="createAt" 
                  name="createAt" 
                  placeholder="Ngày Tạo" 
                  onChange={this.changeHandler.bind(this)}
                  value={moment(this.state.createdAt).format('DD/MM/YYYY')}
                  disabled/>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="updateAt">Ngày Cập Nhật</Label>
                <Input 
                  type="text" 
                  id="updateAt" 
                  name="updateAt" 
                  placeholder="Ngày Cập Nhật" 
                  disabled
                  onChange={this.changeHandler.bind(this)}
                  value={moment(this.state.createdAt).format('DD/MM/YYYY')}/>
              </FormGroup>
              <FormGroup row>
                <Col md='6'><Label htmlFor="isEnabled">Hoạt động</Label></Col>
                <Col md='6'>
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
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(FormShop)
