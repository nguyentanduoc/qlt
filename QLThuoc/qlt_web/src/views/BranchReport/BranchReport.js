import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Col, Row, Card, CardHeader, CardBody} from "reactstrap";
import Widget04 from "../Widgets/Widget04";
import {Form, Input, Button, Table} from 'antd';
import {searchProductOnStore} from '../../actions/productAction';
import {countMemberOfBranch} from '../../actions/branchAction';

const columns = [
  {
    title: 'Tên Sản Phẩm',
    dataIndex: 'productName',
  },
  {
    title: 'Nhà Sản Xuất',
    dataIndex: 'producer',
    render: (producer) => (<div>{producer.producerName}</div>)
  },
  {
    title: 'SL Tồn',
    dataIndex: 'productsOfBranch',
    render: (productsOfBranch) => (<div>{productsOfBranch[0].amount}</div>)
  },
];

class BranchReport extends Component {
  checkAmount = (rule, value, callback) => {
    if (value > 0) {
      callback();
      return;
    }
    callback('Nhập số lớn hơn 0');
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSearch(values);
      }
    });
  };
  componentWillMount() {
    this.props.onCountMemberOfBranch();
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    const {productOnBranch} = this.props.productReducer;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col md={6}>
            <Card>
              <CardHeader>Sản Phẩm
                <div className="card-header-actions">
                  <Form layout="inline" onSubmit={this.handleSubmit}>
                    <Form.Item>
                      {getFieldDecorator('amount', {
                        initialValue: 10,
                        rules: [{validator: this.checkAmount}],
                      })(<Input placeholder={'Số lượng tồn'}/>)}
                    </Form.Item>
                    <Form.Item>
                      <Button type="primary" htmlType="submit" icon={'search'}>Tìm</Button>
                    </Form.Item>
                  </Form>
                </div>
              </CardHeader>
              <CardBody>
                <Table columns={columns} dataSource={productOnBranch} size="small" bordered={false}/>
              </CardBody>
            </Card>
          </Col>
          <Col md={6}>
            <Card>
              <CardHeader>Nhân Sự</CardHeader>
              <CardBody>
                <Row>
                  <Col md={4}>
                      <Widget04 icon="icon-people" color="info" header="87.500" value="25" invert>
                      Tổng Nhân Viên
                    </Widget04>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  productReducer: state.productReducer
});
const mapDispatchToProps = (dispatch) => ({
  onSearch: (data) => dispatch(searchProductOnStore(data)),
  onCountMemberOfBranch: () =>  dispatch(countMemberOfBranch())
});
const FormBranchReport = Form.create()(BranchReport);
export default connect(
  mapStateToProps, mapDispatchToProps
)(FormBranchReport);
