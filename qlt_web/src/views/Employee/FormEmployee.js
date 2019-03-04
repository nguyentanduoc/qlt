import React, { Component } from 'react'
import { connect } from 'react-redux'
import AlertCommon from '../Common/AlertCommon'
import { getBranchOfDirector } from '../../actions/branchAction'
import Select from 'react-select'
import {
  Col,
  Form,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Label,
  Input,
  Button,
  CardFooter,
  CustomInput
  } from 'reactstrap';
export class FormEmployee extends Component {
  constructor(props){
    super(props);
    this.state = {
      nameEmployee: '',
      birthDay: new Date(),
      numberPhone:'',
      address: '',
      idBranch:'',
      username:'',
      branchs: []
    }
  }
  componentWillMount(){
    this.props.onGetBranchOfDirector(this.props.authReducer.user.id);
  }
  handleSubmit = (e) => {
    e.preventDefault();
  }
  handleReset = (e) => {
    e.preventDefault();
  }
  changeHandler = () => {

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
                  value={this.state.changeHandler}
                  disabled={this.state.changeHandler === '' ? false: true}/>
              </FormGroup>
              <FormGroup >
                <Label>Tên đăng nhập</Label>
                <Input 
                  type="text"
                  id="username"
                  name="username"
                  onChange={this.changeHandler.bind(this)}
                  required
                  value={this.state.changeHandler}
                  disabled={this.state.changeHandler === '' ? false: true}/>
              </FormGroup>
              <FormGroup >
                <Label>Số điện thoại</Label>
                <Input 
                  type="text"
                  id="numberPhone"
                  name="numberPhone"
                  onChange={this.changeHandler.bind(this)}
                  required
                  value={this.state.changeHandler}
                  disabled={this.state.changeHandler === '' ? false: true}/>
              </FormGroup>
              <FormGroup >
                <Label>Chi nhánh</Label>
                <Select options={this.props.branchReducer.branchSelection} />
              </FormGroup>
              <FormGroup >
                <Label>Địa chỉ</Label>
                <Input 
                  type="text"
                  id="address"
                  name="address"
                  onChange={this.changeHandler.bind(this)}
                  required
                  value={this.state.changeHandler}
                  disabled={this.state.changeHandler === '' ? false: true}/>
              </FormGroup>
          </CardBody>
          <CardFooter></CardFooter>
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
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(FormEmployee)
