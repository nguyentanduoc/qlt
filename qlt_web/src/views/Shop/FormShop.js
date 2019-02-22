import React, { Component } from 'react'
import { connect } from 'react-redux'
import { DatePicker } from 'antd'
import { save } from '../../actions/shopAction'
import Moment from 'react-moment'
import 'moment-timezone'
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
  } from 'reactstrap'
import { dispatch } from 'rxjs/internal/observable/range';

export class FormShop extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id:'',
      nameBranh:'',
      createdAt:'',
      updatedAt:'',
      establishAt: '',
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
    console.log(establishAt._d);
    this.setState({ establishAt: establishAt._d});
  };
  render() {
    return (
      <Form onSubmit={this.handleSubmit.bind(this)} onReset={this.handleReset.bind(this)}>
        <Card>
            <CardHeader>
              <i className="fas fa-store"></i>Chi tiết <strong>Cửa hàng</strong>
            </CardHeader>
            <CardBody>
              <Input type={'hidden'} name='id' id='id' value={this.state.id}/>
              <FormGroup>
                <Label htmlFor="nameBranh">Tên Cửa Hàng</Label>
                <Input 
                  type="text" 
                  id="nameBranh" 
                  name="nameBranh" 
                  placeholder="Tên Cửa Hàng" 
                  required 
                  onChange={this.changeHandler.bind(this)}
                  value={this.state.name}/>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="establishAt">Ngày Thành Lập</Label>
                <DatePicker className="form-control" name="establishAt" id="establishAt" onChange={this.handleChangeDate.bind(this)} />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="createAt">Ngày Tạo</Label>
                <Input 
                  type="text" 
                  id="createAt" 
                  name="createAt" 
                  placeholder="Ngày Tạo" 
                  onChange={this.changeHandler.bind(this)}
                  value={this.state.name}
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
                  value={this.state.name}/>
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
  
})

const mapDispatchToProps = (dispatch) => ({
  onSave: (shop) => {
    return dispatch(save(shop))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(FormShop)
