import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card, CardBody, CardHeader} from "reactstrap";
import {Button, DatePicker, Form, Input, Table} from "antd";
import Moment from "react-moment";
import {search, getDetail} from '../../../actions/importProductAction';
import ModalDetail from "./ModalDetail";

class SearchBill extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isShow: false
    }
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
  toggleModal = async (record) => {
    await this.props.onGetDetail(record.id);
    this.setState({
      isShow: true
    });
  }
  closeModal= () =>{
    this.setState({
      isShow: false
    })
  }

  render() {
    const {
      getFieldDecorator, getFieldsError
    } = this.props.form;
    const {billsImport} = this.props.importProductReducer;
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
              dataSource={billsImport}
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
        <ModalDetail isShow={this.state.isShow} toggleOpen={this.closeModal}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  importProductReducer: state.importProductReducer
})

const mapDispatchToProp = (dispatch) => ({
  onSearch: (condition) => dispatch(search(condition)),
  onGetDetail: (id) => dispatch(getDetail(id))
})
const FormSearchBill = Form.create()(SearchBill);
export default connect(
  mapStateToProps, mapDispatchToProp
)(FormSearchBill);
