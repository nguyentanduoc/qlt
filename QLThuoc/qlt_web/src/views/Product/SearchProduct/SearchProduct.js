import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card, CardBody, CardHeader} from "reactstrap";
import {Button, Form, Input, Select, Table} from "antd";
import {getAllReducer} from '../../../actions/producerAction';
import {search} from '../../../actions/productAction'

const {Option} = Select;

const columns = [
  {
    title: '#',
    dataIndex: 'id',
    key: 'id',
  }, {
    title: 'Tên Sản Phẩm',
    dataIndex: 'productName',
    key: 'productName',
  }, {
    title: 'Nhà Sản Xuất',
    dataIndex: 'producer',
    key: 'producer',
    render: (producer) => (<div>{producer.producerName}</div>)
  }, {
    title: 'Cộng Dụng',
    dataIndex: 'virtue',
    key: 'virtue',
  }, {
    title: 'Mở rộng',
    dataIndex: 'extend',
    key: 'extend',
  }
];

class SearchProduct extends Component {
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

  render() {
    const {
      getFieldDecorator, getFieldsError
    } = this.props.form;
    const {producers} = this.props.producerReducer;

    return (
      <Card className={'border-info card'}>
        <CardHeader><i className={'fa fa-search'}/> Tra cứu Sản Phẩm</CardHeader>
        <CardBody>
          <div>
            <Card>
              <CardBody>
                <Form layout="inline" onSubmit={this.handleSubmit}>
                  <Form.Item>
                    {getFieldDecorator('productName',{
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
            <Table bordered={true} dataSource={this.props.productReducer.productSearch} columns={columns}
                   rowKey={'id'}/>
          </div>
        </CardBody>
      </Card>
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
  onSearch: (condition) => dispatch(search(condition))
})

const FormSearchProduct = Form.create()(SearchProduct);
export default connect(
  mapStateToProps, mapDispatchToPops
)(FormSearchProduct);
