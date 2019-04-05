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
    const {nameShop, updatedAt, createdAt, establishAt, id} = this.props.shopOfDirectorReducer.shop;
    const {isEdit} = this.state;
    const dateFormat = 'DD/MM/YYYY';
    const {getFieldDecorator} = this.props.form;
    return (
      <Card>
        <Form onSubmit={this.handleSubmit}>
          <AlertCommon/>
          <CardHeader>
            <Row>
              <Col md={10}>
                Thông Tin Cửa Hàng
              </Col>
              <Col md={2}>
                <Button htmlType={'button'} color={'primary'} disabled={isEdit} onClick={this.onEdit}>
                  <i className="cui-pencil icons d-block"/></Button>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <Form.Item>
              {getFieldDecorator('id', {
                initialValue: id,
              })(
                <Input disabled={true} type={'hidden'}/>
              )}
            </Form.Item>
            <Form.Item label={'Tên Cửa hàng:'}>
              {getFieldDecorator('nameShop', {
                initialValue: nameShop,
              })(
                <Input type={'textarea'} name={'nameShop'} disabled={!isEdit}/>
              )}
            </Form.Item>
            <Form.Item label="Ngày Thành Lập:">
              {getFieldDecorator('establishAt', {initialValue: moment(establishAt)})(
                <DatePicker disabled={!isEdit} format={dateFormat}/>
              )}
            </Form.Item>
            <Form.Item label="Ngày Đăng Ký:">
              {getFieldDecorator('createAt',
                {initialValue: moment(createdAt)})(
                <DatePicker disabled={true} format={dateFormat}/>
              )}
            </Form.Item>
            <Form.Item label="Ngày Cập Nhật:">
              {getFieldDecorator('updatedAt', {
                initialValue: moment(updatedAt)
              })(
                <DatePicker disabled={true} format={dateFormat}/>
              )}
            </Form.Item>
          </CardBody>
          <CardFooter className={'text-right'}>
            <Button htmlType="submit" size={"small"} color="success" disabled={!isEdit}><i
              className="fa fa-dot-circle-o"/> Lưu</Button>{' '}
            <Button htmlType="reset" size={"small"} color="danger" disabled={!isEdit} onClick={this.resetEdit}><i className="fa fa-ban"/> Khôi Phục</Button>
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
