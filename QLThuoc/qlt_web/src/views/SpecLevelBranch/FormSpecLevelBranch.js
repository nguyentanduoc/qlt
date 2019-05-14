import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card, CardBody, CardHeader} from "reactstrap";
import {
  Form, Input, Button,
} from 'antd';
import {save} from '../../actions/specLevelBranchAction';
import {resetAlert} from '../../actions/alertAction';
import CardFooter from "reactstrap/es/CardFooter";
import AlertCommon from "../Common/AlertCommon";

class FormSpecLevelBranch extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSave(values);
      }
    });
  };

  componentWillUnmount() {
    this.props.onResetAlert();
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} labelCol={{span: 6}} wrapperCol={{span: 18}}>
        <Card>
          <CardHeader>Thao tác</CardHeader>
          <CardBody>
            <AlertCommon/>
            <Form.Item>
              {getFieldDecorator('id')(
                <Input type={'hidden'} name={'id'}/>
              )}
            </Form.Item>
            <Form.Item label={'Tên cấp độ'}>
              {getFieldDecorator('levelName')(
                <Input type={'text'}/>
              )}
            </Form.Item>
            <Form.Item label={'Bán lẽ'}>
              {getFieldDecorator('percentProfit')(
                <Input type={'number'} name={'percentProfit'}/>
              )}
            </Form.Item>
            <Form.Item label={'Bán Sĩ'}>
              {getFieldDecorator('percentProfitShare')(
                <Input type={'number'} name={'percentProfitShare'}/>
              )}
            </Form.Item>
            <Form.Item label={'Chuyển'}>
              {getFieldDecorator('percentProfitChange')(
                <Input type={'number'} name={'percentProfitChange'}/>
              )}
            </Form.Item>
          </CardBody>
          <CardFooter className={'text-right'}>
            <Button htmlType={'submit'} type="primary"><i className="fa fa-dot-circle-o"/>{' '}Lưu</Button>
          </CardFooter>
        </Card>
      </Form>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => ({
  onSave: (data) => (dispatch(save(data))),
  onResetAlert: () => (() => dispatch(resetAlert()))
});

const FormSpecLevelBranchCreate = Form.create()(FormSpecLevelBranch);

export default connect(
  mapStateToProps, mapDispatchToProps
)(FormSpecLevelBranchCreate);

