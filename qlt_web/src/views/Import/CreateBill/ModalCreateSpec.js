import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Form, Select} from "antd";
import {Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import PropTypes from 'prop-types';
import {init, save} from '../../../actions/specUnit';
import CreateNewSpec from "./CreateNewSpec";

class ModalCreateSpec extends Component {
  static propTypes = {
    isOpen: PropTypes.bool,
    toggle: PropTypes.func,
    productId: PropTypes.number
  };

  componentWillMount() {
    this.props.onInit();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.productId = this.props.productId;
        this.props.onSave(values);
      }
    });
  };

  render() {
    const {specUnits} = this.props.specUnitReducer;
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
                label="Chọn Quy Định Đơn vị">
                {getFieldDecorator('specUnits', {
                  rules: [{
                    required: true, message: 'Hãy chọn quy định đơn vị',
                  }],
                })(
                  <Select
                    mode="multiple"
                    placeholder="Hãy chọn quy định đơn vị"
                    style={{width: '100%'}}>
                    {specUnits.map(item => (
                      <Select.Option key={item.value} value={item.value}>
                        {item.label}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
              <CreateNewSpec/>
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
  specUnitReducer: state.specUnitReducer
});

const mapDispatchToProps = (dispatch) => ({
  onInit: () => dispatch(init()),
  onSave: (data) => dispatch(save(data))
});

const FormModal = Form.create()(ModalCreateSpec);

export default connect(
  mapStateToProps, mapDispatchToProps
)(FormModal);
