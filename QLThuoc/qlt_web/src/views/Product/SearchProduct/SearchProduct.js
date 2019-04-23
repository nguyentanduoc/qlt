import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card, CardBody, CardHeader} from "reactstrap";
import {Button, Form, Input, Select, Table} from "antd";

const { Option } = Select;

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
  };
  hasErrors = (fieldsError) => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  };
  handleChange = (producerId) => {

  };

  render() {
    const {
      getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
    } = this.props.form;
    return (
      <Card className={'border-info card'}>
        <CardHeader><i className={'fa fa-search'}/> Tra cứu Sản Phẩm</CardHeader>
        <CardBody>
          <div>
            <Card>
              <CardBody>
                <Form layout="inline" onSubmit={this.handleSubmit}>
                  <Form.Item>
                    {getFieldDecorator('productName')(
                      <Input placeholder="Tên sản phẩm"/>
                    )}
                  </Form.Item>
                  <Form.Item>
                    <Select
                      showSearch
                      style={{ width: 200 }}
                      placeholder="Select a person"
                      optionFilterProp="children"
                      onChange={this.handleChange}
                      filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                      <Option value="1">Option 1</Option>
                      <Option value="2">Option 2</Option>
                      <Option value="3">Option 3</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item>
                    <Button
                      icon={'search'}
                      type="primary"
                      htmlType="submit"
                      disabled={this.hasErrors(getFieldsError())}>
                      Tìm
                    </Button>
                  </Form.Item>
                </Form>
              </CardBody>
            </Card>
            <Table bordered={true} dataSource={null} columns={columns}/>
          </div>
        </CardBody>
      </Card>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

const FormSearchProduct = Form.create()(SearchProduct);
export default connect(
  mapStateToProps,
)(FormSearchProduct);
