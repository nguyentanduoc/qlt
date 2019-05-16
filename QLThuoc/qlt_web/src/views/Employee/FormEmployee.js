import React, {Component} from 'react'
import {connect} from 'react-redux'
import Select from 'react-select'
import {init, save} from '../../actions/employeeAction'
import {resetAlert} from '../../actions/alertAction'
import khongdau from 'khong-dau';
import NumberFormat from 'react-number-format';
import {Button, Card, CardBody, CardFooter, CardHeader, Col, Form, FormGroup, Input, Label} from 'reactstrap';

export class FormEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      nameEmployee: '',
      numberPhone: '',
      username: '',
      branches: [],
      roles: []
    }
  }

  componentWillMount() {
    this.props.onInit(this.props.authReducer.user.id);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSave(this.state);
  };
  handleReset = (e) => {
    e.preventDefault();
    this.setState({
      id: '',
      nameEmployee: '',
      numberPhone: '',
      username: '',
      branches: [],
      roles: [],
    })
  };
  changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === 'nameEmployee') {
      const userNameArray = value.split(" ");
      let result = "";
      for (let i = 0; i < userNameArray.length - 1; i++) {
        result += khongdau(userNameArray[i].charAt(0).toLowerCase());
      }
      result += khongdau(userNameArray[userNameArray.length - 1].toLowerCase());
      this.setState({username: result, nameEmployee: value})
    } else {
      this.setState({
        [name]: value
      });
    }
  };
  handleSelection = (e, selection) => {
    switch (selection.name) {
      case "branches":
        this.setState({
          branches: e
        });
        break;
      case "roles":
        this.setState({
          roles: e
        });
        break;
      default:
        break;
    }
  };

  componentWillUnmount() {
    this.props.onResetAlert();
  }

  render() {
    const {branchesSelection, rolesSelection} = this.props.employeeReducer;
    return (
      <Form onSubmit={this.handleSubmit.bind(this)} onReset={this.handleReset.bind(this)}>
        <Card>
          <CardHeader><i className="fas fa-user-plus"/> Tạo <strong>Tài Khoản</strong></CardHeader>
          <CardBody>
            <Input type="hidden" name="id" value={this.state.id} onChange={this.changeHandler.bind(this)}/>
            <FormGroup row>
              <Label md={5}>Họ Và Tên</Label>
              <Col md={7}>
                <Input
                  type="text"
                  id="nameEmployee"
                  name="nameEmployee"
                  onChange={this.changeHandler.bind(this)}
                  required
                  value={this.state.nameEmployee}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label md={5}>Tên đăng nhập</Label>
              <Col md={7}>
                <Input
                  type="text"
                  id="username"
                  name="username"
                  onChange={this.changeHandler.bind(this)}
                  required
                  value={this.state.username}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label md={5}>Số điện thoại</Label>
              <Col md={7}>
                <NumberFormat
                  className={'form-control'}
                  type={'text'}
                  id="numberPhone"
                  name="numberPhone"
                  value={this.state.numberPhone}
                  format="#### ### ###" mask="_" onChange={this.changeHandler.bind(this)}/>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label md={5}>Chi nhánh</Label>
              <Col md={7}>
                <Select
                  options={branchesSelection}
                  onChange={this.handleSelection.bind(this)}
                  isMulti={true}
                  name="branches"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label md={5}>Quyền</Label>
              <Col md={7}>
                <Select
                  options={rolesSelection}
                  onChange={this.handleSelection.bind(this)}
                  isMulti={true}
                  name="roles"
                />
              </Col>
            </FormGroup>
          </CardBody>
          <CardFooter className="text-right">
            <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"/> Lưu</Button>{' '}
            <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"/> Hủy</Button>
          </CardFooter>
        </Card>
      </Form>
    )
  }
}

const mapStateToProps = (state) => ({
  authReducer: state.auth,
  employeeReducer: state.employeeReducer
});

const mapDispatchToProps = (dispatch) => ({
  onInit: (idDirector) => dispatch(init(idDirector)),
  onSave: (employee) => dispatch(save(employee)),
  onResetAlert: () => dispatch(resetAlert())
});

export default connect(mapStateToProps, mapDispatchToProps)(FormEmployee)
