import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card, CardBody, CardHeader} from "reactstrap";
import {Form} from "antd";
import {Button, Input} from "antd";
import {save} from '../../actions/specLevelBranchAction';
import {resetAlert} from '../../actions/alertAction';

class FormSpecLevelBranch extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
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
      <Card>
        <CardHeader>Thao tác</CardHeader>
        <CardBody>
          <Form onSubmit={this.handleSubmit}>
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
            <Form.Item label={'Phần Trăm Lợi Nhuận'}>
              {getFieldDecorator('percentProfit')(
                <Input type={'number'} name={'percentProfit'}/>
              )}
            </Form.Item>
            <Button htmlType={'submit'}>Lưu</Button>
          </Form>
        </CardBody>
      </Card>
    );
  }
}
const mapStateToProps =(state) =>{
  return {};
}
const mapDispatchToProps = (dispatch) => ({
  onSave: (data) => (dispatch(save(data))),
  onResetAlert: () => (() => dispatch(resetAlert()))
})

const FormSpecLevelBranchCreate = Form.create()(FormSpecLevelBranch);
export default connect(
  mapStateToProps,mapDispatchToProps
)(FormSpecLevelBranchCreate);

