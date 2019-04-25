import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card, CardHeader, CardBody} from 'reactstrap';
import {Button, DatePicker, Form, Input, Table} from "antd";
import {search, getDetail} from '../../../actions/exportAction';
import ModalBill from "./ModalBill";
import Moment from "react-moment";

export class SearchBill extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpenModal: false
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSearch(values);
      }
    });
  };

  hasErrors = (fieldsError) => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  };

  toggleModal = async (record) => {
    if (!this.state.isOpenModal) {
      await this.props.onGetBillDetail(record.id);
    }
    this.setState({
      isOpenModal: !this.state.isOpenModal
    });
  }

  render() {
    const {
      getFieldDecorator, getFieldsError
    } = this.props.form;
    const {billsExport} = this.props.exportReducer;
    const {isOpenModal} = this.state;
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
              dataSource={billsExport}
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
                title='Nhân Viên'
                dataIndex='employee'
                key='employee'
                render={(employee) => (<div>{employee.nameEmployee}</div>)}
              />
              <Table.Column
                title='Loại Hóa Đơn'
                dataIndex='isShare'
                key='isShare'
                render={(isShare) => (<div>{isShare ? 'Bán Sĩ' : 'Bán Lẽ'}</div>)}
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
        <ModalBill isShow={isOpenModal} toggleOpen={this.toggleModal}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  exportReducer: state.exportReducer
})

const mapDispatchToProps = (dispatch) => ({
  onSearch: (data) => dispatch(search(data)),
  onGetBillDetail: (data) => dispatch(getDetail(data))
});
const FormSearchBill = Form.create()(SearchBill);

export default connect(mapStateToProps, mapDispatchToProps)(FormSearchBill)
