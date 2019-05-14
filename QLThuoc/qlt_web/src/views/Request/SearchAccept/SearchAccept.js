import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card, CardBody, CardHeader} from "reactstrap";
import {Button, DatePicker, Form, Input, Table} from "antd";
import Moment from "react-moment";
import ModalBill from "./ModalBill";
import {search, getAllWaitingAccept} from '../../../actions/requestProductAction'


class SearchAccept extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenModal: false
    };
  };

  closeModal = () => {
    this.setState({
      isOpenModal: false
    })
  }
  hasErrors = (fieldsError) => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  };
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSearch(values);
      }
    });
  };

  componentWillMount() {
    this.props.onGetAllWaitingAccept();
  }

  render() {
    const {
      getFieldDecorator, getFieldsError
    } = this.props.form;
    const {billsRequest} = this.props.requestReducer;
    return (
      <div>
        <Card className={'border-info card'}>
          <CardHeader><i className={'fa fa-search'}/> Tra cứu Sản Phẩm</CardHeader>
          <CardBody>
            <Card>
              <CardBody>
                <Form layout="inline" onSubmit={this.handleSubmit}>
                  <Form.Item>
                    {getFieldDecorator('id', {
                      initialValue: 0
                    })(
                      <Input placeholder="Mã hóa đơn"/>
                    )}
                  </Form.Item>
                  <Form.Item>
                    {getFieldDecorator('dateCreated')(
                      <DatePicker/>
                    )}
                  </Form.Item>
                  <Form.Item>
                    <Button
                      icon={'search'}
                      type="primary"
                      htmlType="submit"
                      disabled={this.hasErrors(getFieldsError())}>Tìm</Button>
                  </Form.Item>
                </Form>
              </CardBody>
            </Card>
            <Table
              bordered={true}
              dataSource={billsRequest}
              rowKey={'id'}>
              <Table.Column
                title='#'
                dataIndex='id'
                key='id'/>
              <Table.Column
                title='Ngày tạo'
                dataIndex='dateCreated'
                key='dateCreated'
                render={(text) => (<Moment format="HH:SS DD/MM/YYYY">{text}</Moment>)}
              />
              <Table.Column
                title='Đã Chấp Nhận'
                dataIndex='isAccept'
                key='isAccept'
                render={(isAccept) => (<div>{isAccept ? 'Đã Chấp Thuận' : 'Chưa Chấp Thuận'}</div>)}
              />
              <Table.Column
                title='Đã Hủy'
                dataIndex='isCancel'
                key='isCancel'
                render={(isCancel) => (<div>{isCancel ? 'Đã Hủy' : ''}</div>)}
              />
              <Table.Column
                title='Tùy chọn'
                dataIndex='expend'
                key='expend'
                render={(text, record) => (
                  <div>
                    <Button icon={'eye'} onClick={this.toggleModal.bind(this, record)}/>
                  </div>
                )}
              />
            </Table>
          </CardBody>
        </Card>
        <ModalBill isShow={this.state.isOpenModal} toggleOpen={this.closeModal}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {requestReducer: state.requestReducer};
}

const mapDispatchToProp = (dispatch) => ({
  onSearch: (condition) => dispatch(search(condition)),
  onGetAllWaitingAccept: () => dispatch(getAllWaitingAccept())
});
const FormSearchAccept = Form.create()(SearchAccept);
export default connect(
  mapStateToProps, mapDispatchToProp
)(FormSearchAccept);
