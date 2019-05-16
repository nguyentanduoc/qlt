import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Form} from 'antd';
import {Button, Card, CardBody, CardFooter, CardHeader, Col, FormGroup, Input, Label} from 'reactstrap';
import NumberFormat from "react-number-format";
import Select from "react-select";
import {getRolesByLeader, saveEmployee} from '../../actions/employeeOfBranchAction'
import khongdau from "khong-dau";

class FormEmployeeOfBranch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      nameEmployee: '',
      numberPhone: '',
      username: '',
      roles: [],
      branch: this.props.authenticationReducer.branch
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSaveEmployee(this.state);
  };
  handleReset = (e) => {
    e.preventDefault();
  };

  componentWillMount() {
    this.props.onGetRoleForLeader();
  }

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

  handleSelection = (option, event) => {
    switch (event.name) {
      case 'roles':
        this.setState({roles: option});
        break;
      default:
        break;
    }
  };

  render() {
    const {roles} = this.props.employeeOfBranchReducer;
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
              <Label md={5}>Quyền</Label>
              <Col md={7}>
                <Select
                  options={roles}
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
    );
  }
}

const createFormEmployeeOfBranch = Form.create()(FormEmployeeOfBranch);

const mapStateToProps = (state) => ({
  employeeOfBranchReducer: state.employeeOfBranchReducer,
  authenticationReducer: state.auth
});
const mapDispatchToProps = (dispatch) => ({
  onGetRoleForLeader: () => dispatch(getRolesByLeader()),
  onSaveEmployee: (data) => dispatch(saveEmployee(data))
});


export default connect(
  mapStateToProps, mapDispatchToProps
)(createFormEmployeeOfBranch);
