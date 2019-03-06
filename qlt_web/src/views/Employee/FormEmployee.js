import React, { Component } from 'react'
import { connect } from 'react-redux'
import AlertCommon from '../Common/AlertCommon'
import { getBranchOfDirector } from '../../actions/branchAction'
import Select from 'react-select'
import { save } from '../../actions/employeeAction'
import {
  Form,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Label,
  Input,
  Button,
  CardFooter,
  } from 'reactstrap';
export class FormEmployee extends Component {
  constructor(props){
    super(props);
    this.state = {
      id:'',
      nameEmployee: '',
      birthDay: new Date(),
      numberPhone:'',
      address: '',
      username:'',
      branchs: []
    }
  }
  componentWillMount(){
    this.props.onGetBranchOfDirector(this.props.authReducer.user.id);
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSave(this.state);
  }
  handleReset = (e) => {
    e.preventDefault();
  }
  changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    });
  }
  handleSeletion = (e) => {
    this.setState({
      branchs: e
    })
  }
  render() {
    return (
      <Form onSubmit={this.handleSubmit.bind(this)} onReset={this.handleReset.bind(this)}>
        <Card>
          <CardHeader><i className="fas fa-user-plus"></i> Tạo <strong>Tài Khoản</strong></CardHeader>
          <CardBody>
            <AlertCommon/>
              <Input type="hidden" name="id" value={this.state.id} onChange={this.changeHandler.bind(this)}/>
              <FormGroup >
                <Label>Họ Và Tên</Label>
                <Input 
                  type="text"
                  id="nameEmployee"
                  name="nameEmployee"
                  onChange={this.changeHandler.bind(this)}
                  required
                  value={this.state.nameEmployee}
                  // disabled={this.state.changeHandler === '' ? false: true}/>
                  />
              </FormGroup>
              <FormGroup >
                <Label>Tên đăng nhập</Label>
                <Input 
                  type="text"
                  id="username"
                  name="username"
                  onChange={this.changeHandler.bind(this)}
                  required
                  value={this.state.username}
                  // disabled={this.state.changeHandler === '' ? false: true}/>
                  />
              </FormGroup>
              <FormGroup >
                <Label>Số điện thoại</Label>
                <Input 
                  type="text"
                  id="numberPhone"
                  name="numberPhone"
                  onChange={this.changeHandler.bind(this)}
                  required
                  value={this.state.numberPhone}
                  // disabled={this.state.changeHandler === '' ? false: true}/>
                  />
              </FormGroup>
              <FormGroup >
                <Label>Chi nhánh</Label>
                <Select 
                  options={this.props.branchReducer.branchSelection}
                  onChange={this.handleSeletion.bind(this)}
                  isMulti = {true}
                  />
              </FormGroup>
              <FormGroup >
                <Label>Địa chỉ</Label>
                <Input 
                  type="textarea" 
                  id="address"
                  name="address"
                  onChange={this.changeHandler.bind(this)}
                  required
                  value={this.state.address}
                  // disabled={this.state.changeHandler === '' ? false: true}/>
                  />
              </FormGroup>
          </CardBody>
          <CardFooter className="text-right">
            <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Lưu</Button>
            <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Hủy</Button>
          </CardFooter>
        </Card>
      </Form>
    )
  }
}

const mapStateToProps = (state) => ({
  authReducer: state.auth,
  branchReducer: state.branchReducer
})

const mapDispatchToProps =(dispatch) => ({
  onGetBranchOfDirector: (idDirector) => {
    return dispatch(getBranchOfDirector(idDirector))
  },
  onSave: (employee) => {
    return dispatch(save(employee))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(FormEmployee)
