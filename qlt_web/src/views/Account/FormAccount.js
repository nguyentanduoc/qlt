import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import AlertCommon from '../Common/AlertCommon'
import { showAlertFail } from '../../actions/alertAction'
import { createAccount, resetUserFordetail } from '../../actions/UserAction'
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

export class FormAccount extends Component {
  constructor(props){
    super(props)
    this.state = {
      id:'',
      username: '',
      email:'',
      isEnabled: true,
      roles: [],
      validRole: true
    }
  }
  changeHandler = async event => {
    const name = event.target.name;
    const value = event.target.value;
    let rolesReducer  = this.props.roleReducer.roles;
    let roles = this.state.roles;
    if (event.target.type === 'checkbox') {
      if(name==='isEnabled') {
        this.setState({isEnabled: event.target.checked});
      } else {
        if (!event.target.checked) {
          this.setState({
            roles: await _.filter(this.state.roles, function(o) { return o.id !== parseInt(name); })
          });
        }
        else {
          roles.push(await _.filter(rolesReducer, (o)=> { return o.id === parseInt(name); })[0]);
          this.setState({
            roles: roles
          })
        }
      }
    } else {
      this.setState({
        [name]: value
      });
    }
  }
  handleSubmit = async (e) => {
    e.preventDefault();
    if(this.state.roles.length !== 0){
      await this.props.onCreateAccount({
        id: this.state.id,
        email: this.state.email,
        username: this.state.username,
        roles: this.state.roles,
        isEnabled: this.state.isEnabled
      });
    } else {
      this.props.onShowAlertError("Chọn quyền cho Tài Khoản");
    }
  }
  handleReset = async (e) => {
    await this.setState({
      id: '',
      username: '',
      email:'',
      isEnabled: true,
      roles: [],
      validRole: true
    })
  }
  showUser = async () => {
    let user =  this.props.userReducer.user;
    await this.setState({
      id: user.id,
      username: user.username,
      email:user.email,
      isEnabled: user.isEnabled,
      roles: user.roles
    })
  }
  async componentWillUnmount(){
    await this.props.onResetUserForDetail();
  }
  componentDidUpdate(){
    if(this.props.userReducer.flgClickRow) {
      this.showUser();
      this.props.onResetUserForDetail();
    }
  }
  render() {
    let checked = roleId => {
      let roles = this.state.roles.filter(role => {
          return role.id === roleId
      });
      return roles[0] ? true : false;
    }
    return (
      <Form onSubmit={this.handleSubmit.bind(this)} onReset={this.handleReset.bind(this)}>
          <Card>
              <CardHeader><i className="fas fa-user-plus"></i> Tạo <strong>Tài Khoản</strong></CardHeader>
              <CardBody>
                <AlertCommon/>
                  <Input type="hidden" name="id" value={this.state.id} onChange={this.changeHandler.bind(this)}/>
                  <FormGroup >
                      <Label>Tên đăng nhập</Label>
                          <Input 
                            type="text"
                            id="username"
                            name="username"
                            onChange={this.changeHandler.bind(this)}
                            required
                            value={this.state.username}
                            disabled={this.state.username === '' ? false: true}/>
                      
                  </FormGroup>
                  <FormGroup>
                      <Label>Email</Label>
                          <Input 
                            type="email" 
                            id="email" 
                            name="email" 
                            onChange={this.changeHandler.bind(this)} 
                            required
                            value={this.state.email}
                            disabled={this.state.email === '' ? false: true}/>
                            </FormGroup>
                  <FormGroup row>
                      <Col md="4"><Label>Quyền:</Label></Col>
                      <Col md="8" xs="12">
                            {this.props.roleReducer.roles.map(role => (
                                <CustomInput
                                    checked={checked(role.id)}
                                    key={role.id}
                                    type="checkbox"
                                    id={role.id}
                                    label={role.detail}
                                    name={role.id}
                                    onChange={this.changeHandler.bind(this)} />
                            ))}
                      </Col>
                  </FormGroup>
                  <FormGroup row>
                      <Col md="4"><Label>Hoạt động</Label></Col>
                      <Col md="8" xs="12">
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
              <CardFooter className="text-right">
                  <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
                  <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>
              </CardFooter>
          </Card>
      </Form>
    )
  }
}

const mapStateToProps = (state) => ({
  roleReducer: state.role,
  alertReducer: state.alertReducer,
  userReducer: state.user
})

const mapDispatchToProps = (dispatch) => ({
  onShowAlertError: async (message) => {
    return await dispatch(showAlertFail(message))
  },
  onCreateAccount: async (account) => {
    return await dispatch(createAccount(account))
  },
  onResetUserForDetail: async() => {
    return await dispatch(resetUserFordetail());
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(FormAccount)
