import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card, CardBody, CardHeader} from "reactstrap";
import {Button, DatePicker, Form, Input, Table} from "antd";
import Moment from "react-moment";
import ModalBill from "./ModalBill";

class SearchRequest extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpenModal: false
    };
  };
  hasErrors = (fieldsError) => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  };

  render() {
    const {
      getFieldDecorator, getFieldsError
    } = this.props.form;
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
              dataSource={null}
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
        <ModalBill isShow={this.state.isOpenModal} toggleOpen={this.closeModal}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}
const FormSearchRequest = Form.create()(SearchRequest);
export default connect(
  mapStateToProps,
)(FormSearchRequest);
