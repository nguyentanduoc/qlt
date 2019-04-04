import React, {Component} from 'react'
import {connect} from 'react-redux'
import AlertCommon from '../Common/AlertCommon'
import Select from 'react-select'
import {init, save} from '../../actions/employeeAction'
import DatePicker from 'react-datepicker'
import {resetAlert} from '../../actions/alertAction'
import {
  Form,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Label,
  Input,
  Button,
  CardFooter, Col
} from 'reactstrap';

export class FormEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      nameEmployee: '',
      numberPhone: '',
      username: '',
      branchs: [],
      roles: [],
      dateJoin: new Date()
    }
  }

  componentWillMount() {
    this.props.onInit(this.props.authReducer.user.id);
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
    this.setState({
      [name]: value
    });
  }
  handleSeletion = (e, selection) => {
    switch (selection.name) {
      case "branchs":
        this.setState({
          branchs: e
        })
        break;
      case "roles":
        this.setState({
          roles: e
        })
        break;
      default:
        break;
    }
  }
  handleChangeDate = dateJoin => {
    this.setState({dateJoin: dateJoin});
  }

  componentWillUnmount() {
    this.props.onResetAlert();
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit.bind(this)} onReset={this.handleReset.bind(this)}>
        <Card>
          <CardHeader><i className="fas fa-user-plus"></i> Tạo <strong>Tài Khoản</strong></CardHeader>
          <CardBody>
            <AlertCommon/>
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
                  // disabled={this.state.changeHandler === '' ? false: true}/>
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
                  // disabled={this.state.changeHandler === '' ? false: true}/>
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label md={5}>Số điện thoại</Label>
              <Col md={7}>
                <Input
                  type="text"
                  id="numberPhone"
                  name="numberPhone"
                  onChange={this.changeHandler.bind(this)}
                  required
                  value={this.state.numberPhone}
                  // disabled={this.state.changeHandler === '' ? false: true}/>
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label md={5}>Ngày bắt đầu làm việc</Label>
              <Col md={7}>
                <DatePicker
                  className="form-control"
                  selected={new Date(this.state.dateJoin)}
                  dateFormat="dd/MM/yyyy"
                  onChange={this.handleChangeDate.bind(this)}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label md={5}>Chi nhánh</Label>
              <Col md={7}>
                <Select
                  options={this.props.employeeReducer.branchsSeletion}
                  onChange={this.handleSeletion.bind(this)}
                  isMulti={true}
                  name="branchs"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label md={5}>Quyền</Label>
              <Col md={7}>
                <Select
                  options={this.props.employeeReducer.rolesSeletion}
                  onChange={this.handleSeletion.bind(this)}
                  isMulti={true}
                  name="roles"
                />
              </Col>
            </FormGroup>
          </CardBody>
          <CardFooter className="text-right">
            <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Lưu</Button>{' '}
            <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Hủy</Button>
          </CardFooter>
        </Card>
      </Form>
    )
  }
}

const mapStateToProps = (state) => ({
  authReducer: state.auth,
  employeeReducer: state.employeeReducer
})

const mapDispatchToProps = (dispatch) => ({
  onInit: (idDirector) => {
    return dispatch(init(idDirector))
  },
  onSave: (employee) => {
    return dispatch(save(employee))
  },
  onResetAlert: () => {
    return dispatch(resetAlert());
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(FormEmployee)
