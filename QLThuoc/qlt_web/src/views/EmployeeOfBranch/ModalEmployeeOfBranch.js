import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Modal} from "antd";
import {Col, Form, FormGroup, Input, Label} from "reactstrap";
import Select from "react-select";
import _ from "lodash";
import {resetModal, saveEmployee, setRoleEmployee} from '../../actions/employeeOfBranchAction';

class ModalEmployeeOfBranch extends Component {

  handleCancel = () => {
    this.props.onResetModal();
  }
  handleOk = () => {
    const {employee} = this.props.employeeOfBranchReducer;
    this.props.onSaveEmployee(employee);
  }
  handleSelection = (options) => {
    this.props.onSetRoleEmployee(options);
  }

  render() {
    const {visibleModal, employee, roles} = this.props.employeeOfBranchReducer;
    return (
      <Modal
        align={this}
        visible={visibleModal}
        title="Thông tin Nhân Viên"
        onOk={this.handleOk}
        onCancel={this.handleCancel.bind(this)}
        footer={[
          <Button htmlType={'button'} key="back" onClick={this.handleCancel.bind(this)}>Thoát</Button>,
          <Button htmlType={'button'} key="submit" type="primary" onClick={this.handleOk}>Lưu</Button>
        ]}
      >
        <Form>
          <Input type="hidden" name="id" value={employee.id || ''}/>
          <FormGroup row>
            <Label md={5}>Họ Và Tên</Label>
            <Label md={7}><strong>{employee.nameEmployee}</strong></Label>
          </FormGroup>
          <FormGroup row>
            <Label md={5}>Quyền</Label>
            <Col md={7}>
              <Select
                value={_.intersectionBy(roles, employee.roles, 'value')}
                options={roles}
                onChange={this.handleSelection.bind(this)}
                isMulti={true}
                name="roles"
              />
            </Col>
          </FormGroup>
        </Form>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  employeeOfBranchReducer: state.employeeOfBranchReducer
});

const mapDispatchToProps = (dispatch) => ({
  onResetModal: () => dispatch(resetModal()),
  onSetRoleEmployee: roles => dispatch(setRoleEmployee(roles)),
  onSaveEmployee: employee => dispatch(saveEmployee(employee))
})
export default connect(
  mapStateToProps, mapDispatchToProps
)(ModalEmployeeOfBranch);
