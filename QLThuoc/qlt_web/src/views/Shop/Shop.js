import React, { Component } from 'react'
import { connect } from 'react-redux'
import FormShop from './FormShop'
import { select, setDetail, deleteShop } from '../../actions/shopAction'
import { Table } from 'antd'
import 'moment-timezone'
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Badge,
  Button
  } from 'reactstrap'
class index extends Component {

  constructor(props){
    super(props);
    this.state= {
      columns: [
        {
          key: 'id',
          title: 'ID',
          dataIndex: 'id',
        },
        {
          key: 'nameShop',
          title: 'Tên Cửa Hàng',
          dataIndex: 'nameShop',
        },
         {
          key: 'isEnabled',
          title: 'Hoạt động',
          dataIndex: 'isEnabled',
          render: value => (<Badge color={value? 'success': 'danger'}>{value? 'Hoạt động': 'Dừng hoạt động'}</Badge>)
         }
      ],
      selectedKeys: []
    }
  }
  componentWillMount(){
    this.props.onSelect();
  }
  onSelectedRowKeysChange = (selectedKeys) => {
    this.setState({
      selectedKeys: selectedKeys
    })
  };
  handleDeletedRow = async (e) => {
    e.preventDefault();
    await this.props.onDeleteShop(this.state.selectedKeys);
    this.setState({selectedKeys:[]});
  };
  render() {
    const { selectedKeys } = this.state;
    const rowSelection = {
      selectedKeys,
      onChange: this.onSelectedRowKeysChange
    };
    const onRow = (record) => {
      return {
        onClick: (event) => {
          event.preventDefault();
          this.props.onSetDetail(record);
        }
      };
    };
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="6" md="6">
            <FormShop/>
          </Col>
          <Col xs="12" lg="6" md="6">
            <Card>
              <CardHeader>
                <i className="fas fa-store"/>Danh sách <strong>Cửa hàng</strong>
              </CardHeader>
              <CardBody>
                <div className="float-right pt-1">
                  <Button
                    color='warning'
                    className="btn-square"
                    disabled={this.state.selectedKeys.length <= 0}
                    onClick={this.handleDeletedRow.bind(this)}>
                      <i className="far fa-trash-alt"/>
                  </Button>
                </div>
                <Table
                    rowKey='id'
                    columns={this.state.columns}
                    dataSource={this.props.shopReducer.shops}
                    pagination = {false}
                    rowSelection={rowSelection}
                    onRow={onRow}
                    bordered={true}
                    />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  shopReducer: state.shopReducer
});

const mapDispatchToProps = (dispatch) => ({
  onSelect: (condition) => {
    return dispatch(select(condition));
  },
  onSetDetail: (row) => {
    return dispatch(setDetail(row));
  },
  onDeleteShop: (keys) => {
    return dispatch(deleteShop(keys));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(index)
