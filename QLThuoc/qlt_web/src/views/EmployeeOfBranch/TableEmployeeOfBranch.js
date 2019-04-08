import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Badge, Button, ButtonGroup, Card, CardBody, CardHeader} from "reactstrap";
import {Popconfirm, Table} from "antd";
import ModalEmployee from "./ModalEmployeeOfBranch";
import {getAllEmployee, setInfoEmployee, deleteEmployee} from '../../actions/employeeOfBranchAction'

const Column = Table.Column;

class TableEmployeeOfBranch extends Component {

  componentWillMount() {
    const {branch} = this.props.authenticationReducer;
    this.props.onGetAllEmployees(branch);
  }
  handleOnClickRow = (record) => {
    this.props.onSetInfoEmployee(record);
  }
  handleDelete = (key) => {
    this.props.onDeleteEmployee(key);
  }
  render() {
    const {employees} = this.props.employeeOfBranchReducer;
    if (employees.length > 0)
      return (
        <Card>
          <CardHeader>
            Danh sách Nhân Viên
          </CardHeader>
          <CardBody>
            <Table
              rowKey='id'
              bordered={true}
              dataSource={employees}
              pagination={{ pageSize: 5 }}
            >
              <Column title={'Mã'} dataIndex={'id'} key={'id'}/>
              <Column title={'Tên Nhân Viên'} dataIndex={'nameEmployee'} key={'nameEmployee'}/>
              <Column title={'Số Điện Thoại'} dataIndex={'numberPhone'} key={'numberPhone'}/>
              <Column title={'Chức Vụ'} dataIndex={'roles'} key={'roles'}
                      render={(roles) => (roles && roles.map((value, key) => (
                        <Badge key={key} className="mr-1" color="success">{value.label}</Badge>)))}
              />
              <Column
                title={"Mở rộng"}
                dataIndex={'expand'}
                key={'expand'}
                render={(text, record) => (
                  employees.length >= 1
                    ? (
                      <ButtonGroup>
                        <Button color={'primary'} size="sm" onClick={this.handleOnClickRow.bind(this, record)}><i
                          className="far fa-eye"/></Button>
                        <Popconfirm title="Chắc chắn sẽ xóa?" onConfirm={() => this.handleDelete(record.id)}>
                          <Button color="danger" size="sm"><i className="fas fa-minus"/></Button>
                        </Popconfirm>
                      </ButtonGroup>
                    ) : null
                )}/>
            </Table>
          </CardBody>
          <ModalEmployee/>
        </Card>
      );
    else return null;
  }
}

const mapStateToProps = (state) => ({
  employeeOfBranchReducer: state.employeeOfBranchReducer,
  authenticationReducer: state.auth
});
const mapDispatchToProps = (dispatch) => ({
  onGetAllEmployees: (branch) => dispatch(getAllEmployee(branch)),
  onSetInfoEmployee: (employee) => dispatch(setInfoEmployee(employee)),
  onDeleteEmployee: (employeeId) => dispatch(deleteEmployee(employeeId))
})

export default connect(
  mapStateToProps, mapDispatchToProps
)(TableEmployeeOfBranch);
