import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Badge, Card, CardBody, CardHeader, Row} from 'reactstrap';
import {Table, Popconfirm} from 'antd';
import {Button, ButtonGroup} from 'reactstrap';
import {deleteEmployee, showInfo} from '../../actions/employeeAction';
import ModalEmployee from "./ModalEmployee";

const Column = Table.Column;

class TableEmployee extends Component {
  handleDelete = (id) => {
    this.props.onDeleteEmployee(id);
  };
  handleOnClickRow = (record) => {
    this.props.onShowInfo(record);
  };
  render() {
    const {employees} = this.props.employeeReducer;
    return (
      <Card>
        <CardHeader>
          Danh sách Nhân Viên
        </CardHeader>
        <CardBody>
          <Table
            rowKey='id'
            bordered={true}
            dataSource={employees}>
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
                      <Button color={'primary'} size="sm" onClick={this.handleOnClickRow.bind(this, record)}><i className="far fa-eye"/></Button>
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
  }
}

const mapStateToProps = (state) => ({
  employeeReducer: state.employeeReducer
});
const mapDispatchToProps = (dispatch) => ({
  onDeleteEmployee: (id) => dispatch(deleteEmployee(id)),
  onShowInfo: (employee) => dispatch(showInfo(employee))
});
export default connect(mapStateToProps, mapDispatchToProps)(TableEmployee);
