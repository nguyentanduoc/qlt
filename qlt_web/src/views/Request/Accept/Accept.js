import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card, CardHeader, CardBody} from "reactstrap";
import {Table, Button, Modal, Form, Switch} from "antd";
import {getBillRequest, getDetail, accept, cancel} from "../../../actions/acceptAction";
import Moment from 'react-moment'
import 'moment-timezone'

class Accept extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      visible: false,
      billRequestId: '',
      isSeen: false,
      isReceive: false,
      isAccept: false,
      isDone: false,
      flgLoadingShowDetail: false,
      isCancel: false,
      idBillRequest: ''
    }
  }

  componentWillMount() {
    const condition = {
      isSeen: this.state.isSeen,
      isReceive: this.state.isReceive,
      isAccept: this.state.isAccept,
      isDone: this.state.isDone,
      isCancel: this.state.isCancel
    };
    this.props.onGetBillRequest(this.props.authenticationReducer.branch, condition);
  }

  showDetail = async (text, record) => {
    await this.setState({flgLoadingShowDetail: !this.state.flgLoadingShowDetail, idBillRequest: record.id});
    await this.props.onGetDetail(record.id);
    await this.setState({billRequestId: record.id, flgLoadingShowDetail: !this.state.flgLoadingShowDetail});
    this.showModal();
  }

  handleCancel = async () => {
    await this.props.onCancel(this.state.idBillRequest);
    this.setState({visible: false});

  }
  handleOk = async () => {
    await this.setState({loading: true});
    await this.props.onAccept(this.state.billRequestId);
    this.setState({loading: false, visible: false});
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleToggle = prop => (enable) => {
    this.setState({[prop]: enable});
  }
  handleSearch = async () => {
    const condition = await {
      isSeen: this.state.isSeen,
      isReceive: this.state.isReceive,
      isAccept: this.state.isAccept,
      isDone: this.state.isDone,
      isCancel: this.state.isCancel
    };
    await this.props.onGetBillRequest(this.props.authenticationReducer.branch, condition);
  }

  render() {
    const {billsRequest, detailRequest} = this.props.acceptReducer;
    const {
      visible, loading, isSeen, flgLoadingShowDetail, isReceive,
      isAccept, isDone, isCancel
    } = this.state;
    return (
      <div>
        <Card>
          <CardHeader>
            <strong>Xác Nhận Yêu Cầu</strong>
          </CardHeader>
          <CardBody>
            <Form layout={'inline'}>
              <Form.Item label={'Đã xem'}>
                <Switch checked={isSeen} onChange={this.handleToggle('isSeen')}/>
              </Form.Item>
              <Form.Item label={'Đã Xác Nhận'}>
                <Switch checked={isAccept} onChange={this.handleToggle('isAccept')}/>
              </Form.Item>
              <Form.Item label={'Đã Nhận'}>
                <Switch checked={isReceive} onChange={this.handleToggle('isReceive')}/>
              </Form.Item>
              <Form.Item label={'Đã Hoàn Tất'}>
                <Switch checked={isDone} onChange={this.handleToggle('isDone')}/>
              </Form.Item>
              <Form.Item label={'Đã Hủy'}>
                <Switch checked={isCancel} onChange={this.handleToggle('isCancel')} type="danger"/>
              </Form.Item>
              <Button htmlType={'button'} onClick={this.handleSearch} type="primary" icon="search">Tìm</Button>
            </Form>
            <Table
              rowKey='id'
              bordered={true}
              dataSource={billsRequest}
            >
              <Table.Column
                title={'Mã Yêu Cầu'}
                dataIndex={'id'}
                key={'id'}/>
              <Table.Column
                title={'Chi Nhánh Yêu Cầu'}
                dataIndex={'branch'}
                key={'branch'}/>
              <Table.Column
                title={'Ngày Yêu Cầu'}
                dataIndex={'dateRequested'}
                key={'dateRequested'}
                render={(text) => (
                  (<Moment format="DD/MM/YYYY">{text}</Moment>)
                )}
              />
              <Table.Column
                title={'Ghi Chú Yêu Cầu'}
                dataIndex={'noteRequest'}
                key={'noteRequest'}
              />
              <Table.Column
                title={'Hành Động'}
                dataIndex={'operation'}
                key={'operation'}
                render={(text, record) => (
                  billsRequest.length > 0 ? (
                    <span>
                      <Button htmlType='button' type="primary" icon={'info-circle'}
                              onClick={() => this.showDetail(text, record)} loading={flgLoadingShowDetail}/>
                    </span>
                  ) : null
                )}
              />
            </Table>
          </CardBody>
        </Card>
        <Modal
          visible={visible}
          title="Chi tiết Phiếu Yêu Cầu"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button htmlType={'button'} key="back" onClick={this.handleCancel} icon={'close'}
                    type="danger">Hủy</Button>,
            <Button htmlType={'button'} key="submit" type="primary" loading={loading} onClick={this.handleOk}
                    icon={'check'}>
              Xác Nhận
            </Button>,
          ]}
        >
          <Table
            rowKey='product'
            bordered={true}
            dataSource={detailRequest}
          >
            <Table.Column
              title={'Tên Sản Phẩm'}
              dataIndex={'product'}
              key={'product'}/>
            <Table.Column
              title={'Số lượng'}
              dataIndex={'amount'}
              key={'amount'}/>
            <Table.Column
              title={'Đơn vị'}
              dataIndex={'unit'}
              key={'unit'}/>
          </Table>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticationReducer: state.auth,
    acceptReducer: state.acceptReducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onGetBillRequest: (branch, condition) => {
      return dispatch(getBillRequest(branch, condition));
    },
    onGetDetail: (id) => {
      return dispatch(getDetail(id));
    },
    onAccept: (id) => {
      return dispatch(accept(id));
    },
    onCancel: (id) => {
      return dispatch(cancel(id));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Accept);
