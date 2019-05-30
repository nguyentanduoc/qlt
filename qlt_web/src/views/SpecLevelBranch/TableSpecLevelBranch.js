import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card, CardBody, CardHeader} from "reactstrap";
import {Button, Table} from 'antd';
import {getAll, deleteSpecLevelBranch} from '../../actions/specLevelBranchAction';

class TableSpecLevelBranch extends Component {
  componentWillMount() {
    this.props.onGetAll();
  }

  onDelete = (event, value) => {
    this.props.onDeleteSpecLevelBranch(value.id);
  };

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
              key={'percentProfitChange'}
              dataIndex={'percentProfitChange'}
              title={'Chuyển'}
            />
            <Table.Column
              key={'expand'}
              dataIndex={'expand'}
              title={'Xóa'}
              render={(record, value) => (
                <Button icon={'delete'} onClick={this.onDelete.bind(this, record, value)} type={"danger"}/>)
              }
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
  onDeleteSpecLevelBranch: (id) => dispatch(deleteSpecLevelBranch(id))
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(TableSpecLevelBranch);
