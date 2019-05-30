import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Modal, Button} from 'antd';
import {toggleModal, setBranchesForEmployeeInfo, setRolesForEmployeeInfo} from '../../actions/employeeAction';
import {Col, Form, FormGroup, Input, Label} from "reactstrap";
import Select from 'react-select';
import _ from 'lodash';
import {save} from '../../actions/employeeAction'

class ModalEmployee extends Component {

  handleOk = (event) => {
    event.preventDefault();
    const {employeeInfo} = this.props.employeeReducer;
    this.props.onSave(employeeInfo);
  };
  handleCancel = (event) => {
    event.preventDefault();
    this.props.onToggleModal();
  };
  handleSelection = (e, selection) => {
    switch (selection.name) {
      case "branches":
        this.props.onSetBranchesForEmployeeInfo(e);
        break;
      case "roles":
        this.props.onSetRolesForEmployeeInfo(e);
        break;
      default:
        break;
    }
  };

  render() {
    const {branchesSelection, rolesSelection, visibleModal, employeeInfo} = this.props.employeeReducer;
    if (employeeInfo.id) {
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
            <Input type="hidden" name="id" value={employeeInfo.id}/>
            <FormGroup row>
              <Label md={5}>Họ Và Tên</Label>
              <Label md={7}><strong>{employeeInfo.nameEmployee}</strong></Label>
            </FormGroup>
            <FormGroup row>
              <Label md={5}>Chi nhánh</Label>
              <Col md={7}>
                <Select
                  value={_.intersectionBy(branchesSelection, employeeInfo.branches, 'value')}
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
                  value={_.intersectionBy(rolesSelection, employeeInfo.roles, 'value')}
                  options={rolesSelection}
                  onChange={this.handleSelection.bind(this)}
                  isMulti={true}
                  name="roles"
                />
              </Col>
            </FormGroup>
          </Form>
        </Modal>
      );
    } else
      return null;
  }
}

const mapStateToProps = (state) => ({
  employeeReducer: state.employeeReducer
});
const mapDispatchToProp = (dispatch) => ({
  onToggleModal: () => dispatch(toggleModal()),
  onSetBranchesForEmployeeInfo: (branches) => dispatch(setBranchesForEmployeeInfo(branches)),
  onSetRolesForEmployeeInfo: (roles) => dispatch(setRolesForEmployeeInfo(roles)),
  onSave: (employee) => dispatch(save(employee))
});
export default connect(
  mapStateToProps, mapDispatchToProp
)(ModalEmployee);
