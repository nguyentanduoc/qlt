import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card, CardBody, CardHeader} from "reactstrap";
import {Table} from 'antd';
import {getAll} from '../../actions/specLevelBranchAction';
import {resetAlert} from '../../actions/alertAction'

class TableSpecLevelBranch extends Component {
  componentWillMount() {
    this.props.onGetAll();
  }
  componentWillUnmount() {
    this.props.onResetAlert();
  }

  render() {
    const {specLevelBranches} = this.props.specLevelBranchReducer;
    return (
      <Card>
        <CardHeader>Danh Sách</CardHeader>
        <CardBody>
          <Table bordered={true} rowKey={'id'} dataSource={specLevelBranches}>
            <Table.Column
              key={'id'}
              dataIndex={'id'}
              title={'Mã Số'}
            />
            <Table.Column
              key={'levelName'}
              dataIndex={'levelName'}
              title={'Tên Cấp Độ'}
            />
            <Table.Column
              key={'percentProfit'}
              dataIndex={'percentProfit'}
              title={'Bán lẽ'}
            />
            <Table.Column
              key={'percentProfitShare'}
              dataIndex={'percentProfitShare'}
              title={'Bán sĩ'}
            />
            <Table.Column
              key={'percentProfit'}
              dataIndex={'percentProfitChange'}
              title={'Chuyển'}
            />
          </Table>
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = (state) => ({
  specLevelBranchReducer: state.specLevelBranchReducer
});
const mapDispatchToProps = (dispatch) => ({
  onGetAll: () => (dispatch(getAll())),
  onResetAlert: () => (dispatch(resetAlert()))
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(TableSpecLevelBranch);
