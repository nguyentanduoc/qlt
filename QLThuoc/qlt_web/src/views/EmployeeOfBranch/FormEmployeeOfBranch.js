import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Form} from 'antd';
import {Card, CardHeader, CardFooter, CardBody, Input, FormGroup, Label, Col, Button} from 'reactstrap';
import AlertCommon from "../Common/AlertCommon";
import NumberFormat from "react-number-format";
import Select from "react-select";

class FormEmployeeOfBranch extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: '',
      nameEmployee: '',
      numberPhone: '',
      username: '',
      roles: []
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
  }
  handleReset = (e) => {
    e.preventDefault();
    console.log("reset");
  }
  componentWillMount() {

  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit.bind(this)} onReset={this.handleReset.bind(this)}>
        <Card>
          <CardHeader><i className="fas fa-user-plus"/> Tạo <strong>Tài Khoản</strong></CardHeader>
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
    );
  }
}
const createFormEmployeeOfBranch = Form.create()(FormEmployeeOfBranch);

const mapStateToProps = (state) => ({
});
const mapDispatchToProps = (dispatch) =>({
});


export default connect(
  mapStateToProps,mapDispatchToProps
)(createFormEmployeeOfBranch);
