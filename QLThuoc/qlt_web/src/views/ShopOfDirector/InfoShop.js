import React, {Component} from 'react';
import {connect} from 'react-redux';
import {CardHeader, CardBody, Card, Row, Col, CardFooter} from "reactstrap";
import {getShopOfDirector, updateShop} from "../../actions/shopOfDirectorAction";
import 'moment-timezone';
import moment from 'moment';
import {DatePicker, Form, Input, Button} from 'antd';
import AlertCommon from "../Common/AlertCommon";

class InfoShop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      establishAt: new Date(),
      nameShop: ''
    }
  };

  componentWillMount() {
    this.props.onGetShopOfDirector();
  };
  onEdit = (e) => {
    e.preventDefault();
    this.setState({isEdit: true})
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.onUpdateShop(values);
        this.resetEdit(e);
      }
    });
  };
  resetEdit = (e) => {
    e.preventDefault();
    this.setState({isEdit: false})
  };

  render() {
    const {shop} = this.props.shopOfDirectorReducer;
    const {isEdit} = this.state;
    const dateFormat = 'DD/MM/YYYY';
    const {getFieldDecorator} = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    return (
      <Card className={'card-accent-primary card'}>
        <Form onSubmit={this.handleSubmit}>
          <AlertCommon/>
          <CardHeader>
            <Row>
              <Col md={9}>
                Thông Tin Cửa Hàng
              </Col>
              <Col md={3} className={'text-right'}>
                <Button htmlType={'button'} color={'primary'} disabled={isEdit} onClick={this.onEdit} icon={'edit'}/>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <Form.Item>
              {getFieldDecorator('id', {
                initialValue: shop ? shop.id : '',
              })(
                <Input disabled={true} type={'hidden'}/>
              )}
            </Form.Item>
            <Form.Item label={'Tên Cửa hàng:'} {...formItemLayout}>
              {getFieldDecorator('nameShop', {
                initialValue: shop ? shop.nameShop : '',
              })(
                <Input type={'textarea'} name={'nameShop'} disabled={!isEdit}/>
              )}
            </Form.Item>
            <Form.Item label="Ngày Thành Lập:" {...formItemLayout}>
              {getFieldDecorator('establishAt', {initialValue: moment(shop ? shop.establishAt : null)})(
                <DatePicker disabled={!isEdit} format={dateFormat}/>
              )}
            </Form.Item>
            <Form.Item label="Ngày Đăng Ký:" {...formItemLayout}>
              {getFieldDecorator('createAt',
                {initialValue: moment(shop ? shop.createdAt : null)})(
                <DatePicker disabled={true} format={dateFormat}/>
              )}
            </Form.Item>
            <Form.Item label="Ngày Cập Nhật:" {...formItemLayout}>
              {getFieldDecorator('updatedAt', {
                initialValue: moment(shop ? shop.updatedAt : null)
              })(
                <DatePicker disabled={true} format={dateFormat}/>
              )}
            </Form.Item>
          </CardBody>
          <CardFooter className={'text-right'}>
            <Button htmlType="submit" size={"small"} type="primary" disabled={!isEdit}>
              <i className="fa fa-dot-circle-o"/>Lưu</Button>{' '}
            <Button htmlType="reset" size={"small"} type="danger" disabled={!isEdit} onClick={this.resetEdit}>
              <i className="fa fa-ban"/>Khôi Phục</Button>
          </CardFooter>
        </Form>
      </Card>
    );
  }
}

const mapStateToProps = (state) => ({
  shopOfDirectorReducer: state.shopOfDirectorReducer
});
const mapDispatchToProps = (dispatch) => ({
  onGetShopOfDirector: () => dispatch(getShopOfDirector()),
  onUpdateShop: (data) => dispatch(updateShop(data))
});
const FormInfoShop = Form.create()(InfoShop);
export default connect(
  mapStateToProps, mapDispatchToProps
)(FormInfoShop);
