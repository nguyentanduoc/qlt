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
      seletedKeys: []
    }
  }
  componentWillMount(){
    this.props.onSelect();
  }
  onSelectedRowKeysChange = (seletedKeys) => {
    this.setState({
      seletedKeys: seletedKeys
    })
  }
  handleDeletedRow = async (e) => {
    e.preventDefault();
    await this.props.onDeleteShop(this.state.seletedKeys);
    console.log("delete");
    this.setState({seletedKeys:[]});
  }
  render() {
    const { seletedKeys } = this.state;
    const rowSelection = {
      seletedKeys,
      onChange: this.onSelectedRowKeysChange
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
        <Col xs="12" lg="6" md="6">
            <FormShop/>
          </Col>
          <Col xs="12" lg="6" md="6">
            <Card>
              <CardHeader>
                <i className="fas fa-store"></i>Danh sách <strong>Cửa hàng</strong>
              </CardHeader>
              <CardBody>
                <Row>
                  <Button 
                    color='warning'
                    className="btn-square ml-1"
                    disabled={this.state.seletedKeys.length > 0 ? false : true}
                    onClick={this.handleDeletedRow.bind(this)}>
                      <i className="far fa-trash-alt"></i>
                  </Button>
                </Row>
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
  },
  onDeleteShop: (keys) => {
    return dispatch(deleteShop(keys));
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(index)
