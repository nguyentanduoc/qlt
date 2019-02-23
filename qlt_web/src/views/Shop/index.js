import React, { Component } from 'react'
import { connect } from 'react-redux'
import FormShop from './FormShop'
import { select, setDetail } from '../../actions/shopAction'
import { Table } from 'antd'
import Moment from 'react-moment'
import 'moment-timezone'
import moment from 'moment'
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Badge,
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
          key: 'establishAt',
          title: 'Ngày Thành Lập',
          dataIndex: 'establishAt',
          render: value => {moment(value).format('DD/MM//YYYY')}
         },
         {
          key: 'isEnabled',
          title: 'Hoạt động',
          dataIndex: 'isEnabled',
          render: value => (<Badge color={value? 'success': 'danger'}>{value? 'Hoạt động': 'Dừng hoạt động'}</Badge>)
         }
      ],
      selectedRowKeys: []
    }
  }
  componentWillMount(){
    this.props.onSelect();
  }
  onSelectedRowKeysChange = (selectedRowKeys) => {
    console.log(selectedRowKeys);
  }
  // componentDidMount(){
  //   this.setState({
  //     columns: 
  //   })
  // }
  render() {
    const rowSelection = {
      onChange: (selectedRowKeys) => {
        this.onSelectedRowKeysChange(selectedRowKeys);
      }
    };
    const onRow = (record) => {
      return {
        onClick: (event) => {
          event.preventDefault();
          this.props.onSetDetail(record);
        }
      };
    }
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="8">
            <Card>
              <CardHeader>
                <i className="fas fa-store"></i>Danh sách <strong>Cửa hàng</strong>
              </CardHeader>
              <CardBody>
              <Table
                  rowKey='id'
                  columns={this.state.columns}
                  dataSource={this.props.shopReducer.shops}
                  pagination = {false}
                  rowSelection={rowSelection}
                  onRow={onRow}
                  />
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" lg="4">
            <FormShop/>
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  shopReducer: state.shopReducer
})

const mapDispatchToProps = (dispatch) => ({
  onSelect: (conditon) => {
    return dispatch(select(conditon));
  },
  onSetDetail: (row) => {
    return dispatch(setDetail(row));
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(index)
