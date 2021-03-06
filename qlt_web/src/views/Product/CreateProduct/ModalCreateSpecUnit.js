import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Form, InputNumber, Select} from "antd";
import {Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import PropTypes from 'prop-types';
import {saveUnitCreateProduct} from '../../../actions/specUnit';

class ModalCreateSpec extends Component {
  static propTypes = {
    isOpen: PropTypes.bool,
    toggle: PropTypes.func,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSave(values);
      }
    });
  };
  validateUnitOut = (rule, value, callback) => {
    const form = this.props.form;
    if (form.getFieldValue('unitIn') === value) {
      callback("Không được trùng");
    }
    callback();
  };

  render() {
    const {units} = this.props.productReducer;
    const {getFieldDecorator} = this.props.form;
    return (
      <div>
        <Form onSubmit={this.handleSubmit.bind(this)} layout="inline">
          <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
            <ModalHeader>
              Tạo Quy định
            </ModalHeader>
            <ModalBody>
              <Form.Item
                label="Đơn vị đầu">
                {getFieldDecorator('unitIn', {
                  rules: [{
                    required: true, message: 'Hãy chọn Đơn vị',
                  }],
                })(
                  <Select
                    mode="default"
                    placeholder="Chọn đơn vị"
                    style={{width: '100%'}}
                  >
                    {units.map(item => (
                      <Select.Option key={item.value} value={item.value}>
                        {item.label}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
              <Form.Item
                label="Đơn vị cuối">
                {getFieldDecorator('unitOut', {
                  rules: [{
                    required: true, message: 'Hãy chọn Đơn vị',
                  }, {
                    validator: this.validateUnitOut,
                  }],
                })(
                  <Select
                    mode="default"
                    placeholder="Chọn đơn vị"
                    style={{width: '100%'}}>
                    {units.map(item => (
                      <Select.Option key={item.value} value={item.value}>
                        {item.label}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
              <Form.Item
                label="Số lượng">
                {getFieldDecorator('amount', {
                  rules: [{
                    required: true, message: 'Hãy nhập số lượng',
                  }, {
                    validator: (rule, value, callback) => {
                      if (value <= 0) {
                        callback("Số lượng lớn hơn không!");
                      } else {
                        callback();
                      }
                    },
                  }],
                })(
                  <InputNumber/>
                )}
              </Form.Item>
            </ModalBody>
            <ModalFooter>
              <Button htmlType="submit" type="primary" onClick={this.handleSubmit}>Lưu</Button>{' '}
              <Button type="danger" onClick={this.props.toggle}>Hủy</Button>
            </ModalFooter>
          </Modal>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  productReducer: state.productReducer,
});

const mapDispatchToProps = (dispatch) => ({
  onSave: (data) => dispatch(saveUnitCreateProduct(data))
});

const FormModal = Form.create()(ModalCreateSpec);

export default connect(
  mapStateToProps, mapDispatchToProps
)(FormModal);
