import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card, CardBody, CardHeader} from "reactstrap";
import {Button, Form, Input, Select, Table} from "antd";
import {getAllReducer} from '../../../actions/producerAction';
import {search, searchPrice, getProductById} from '../../../actions/productAction'
import ModalInfoProduct from "./ModalInfoProduct";
import ModalEditProduct from "./ModalEditProduct";

const {Option} = Select;

class SearchProduct extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpenModal: false,
      isOpenModalEdit: false
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSearch(values)
      }
    });
  };
  hasErrors = (fieldsError) => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  };

  componentWillMount() {
    this.props.onGetAllProducer();
  };

  toggleModal = async (record) => {
    if (!this.state.isOpenModal) {
      await this.props.onSearchPrice(record.id);
    }
    this.setState({
      isOpenModal: !this.state.isOpenModal
    });
  };

  toggleModalEdit = async (record) => {
    if (!this.state.isOpenModalEdit) {
      await this.props.onGetProductByID(record.id);
    }
    this.setState({
      isOpenModalEdit: !this.state.isOpenModalEdit
    });
  };

  render() {
    const {
      getFieldDecorator, getFieldsError
    } = this.props.form;
    const {producers} = this.props.producerReducer;
    const {isOpenModal, isOpenModalEdit} = this.state;

    return (
      <div>
        <Card className={'border-info card'}>
          <CardHeader><i className={'fa fa-search'}/> Tra cứu Sản Phẩm</CardHeader>
          <CardBody>
            <div>
              <Card>
                <CardBody>
                  <Form layout="inline" onSubmit={this.handleSubmit}>
                    <Form.Item>
                      {getFieldDecorator('productName', {
                        initialValue: ''
                      })(
                        <Input placeholder="Tên sản phẩm"/>
                      )}
                    </Form.Item>
                    <Form.Item>
                      {getFieldDecorator('producerId')(
                        <Select
                          showSearch
                          style={{width: 200}}
                          placeholder="Chọn Nhà Sản Xuất"
                          optionFilterProp="children"
                          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                          <Option value='0'>--Chọn Nhà Sản Xuất--</Option>
                          {producers.length > 0 && producers.map((producer, idx) => (
                            <Option key={idx} value={producer.value}>{producer.label}</Option>
                          ))}
                        </Select>
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
                dataSource={this.props.productReducer.productSearch}
                rowKey={'id'}>
                <Table.Column
                  title='#'
                  dataIndex='id'
                  key='id'/>
                <Table.Column
                  title='Tên Sản Phẩm'
                  dataIndex='productName'
                  key='productName'/>
                <Table.Column
                  title='Nhà Sản Xuất'
                  dataIndex='producer'
                  key='producer'
                  render={
                    (producer) => (
                      <div>{producer.producerName}</div>
                    )
                  }
                />
                <Table.Column
                  title='Cộng Dụng'
                  dataIndex='virtue'
                  key='virtue'/>
                <Table.Column
                  title='Mở rộng'
                  dataIndex='extend'
                  key='extend'
                  render={(text, record) => (
                    <span>
                      <Button type={'button'} onClick={this.toggleModalEdit.bind(this, record)} icon={'edit'}/>{' '}
                      <Button type={'button'} onClick={this.toggleModal.bind(this, record)} icon={'eye'}/>
                    </span>
                  )}
                />
              </Table>
            </div>
          </CardBody>
        </Card>
        <ModalInfoProduct isShow={isOpenModal} toggleOpen={this.toggleModal}/>
        <ModalEditProduct isShow={isOpenModalEdit} toggleOpen={this.toggleModalEdit}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    producerReducer: state.producerReducer,
    productReducer: state.productReducer
  };
}

const mapDispatchToPops = (dispatch) => ({
  onGetAllProducer: () => dispatch(getAllReducer()),
  onSearch: (condition) => dispatch(search(condition)),
  onSearchPrice: (data) => dispatch(searchPrice(data)),
  onGetProductByID: (id) => dispatch(getProductById(id))
})

const FormSearchProduct = Form.create()(SearchProduct);
export default connect(
  mapStateToProps, mapDispatchToPops
)(FormSearchProduct);
