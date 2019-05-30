import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {Form, Input} from "antd";
import {createUnit} from '../../../actions/specUnit';

class ModalCreateUnit extends Component {
  static propTypes = {
    flgOpenModal: PropTypes.bool,
    toggleModal: PropTypes.any
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.onCreateUnit(values.unitName);
      }
    });
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <Modal isOpen={this.props.flgOpenModal} toggle={this.props.toggleModal}>
        <Form onSubmit={this.handleSubmit}>
          <ModalHeader toggle={this.props.toggleModal}>Thêm Đơn Vị</ModalHeader>
          <ModalBody>
            <Form.Item
              label="Tên Đơn Vị">
              {getFieldDecorator('unitName', {
                rules: [{
                  required: true, message: 'Hãy nhập Tên Đơn vị',
                }],
              })(
                <Input/>
              )}
            </Form.Item>
          </ModalBody>
          <ModalFooter>
            <Button size="sm" color="primary" className="btn-brand" type="submit">
              <i className="fa fa-dot-circle-o mr-2"/>Lưu</Button>{' '}
            <Button size="sm" color="danger" onClick={this.props.toggleModal} className="btn-brand">
              <i className="fa fa-ban mr-2"/>Thoát</Button>
          </ModalFooter>
        </Form>
      </Modal>
    )
  }
}

function mapStateToProps(state) {
  return {};
}
const mapDispatchToProps = (dispatch) => ({
  onCreateUnit: (data) => dispatch(createUnit(data))
});
const FormModalCreateUnit = Form.create()(ModalCreateUnit);
export default connect(
  mapStateToProps,mapDispatchToProps
)(FormModalCreateUnit);
