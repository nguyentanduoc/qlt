import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Modal, Form, Input, Select, Button} from "antd";
import PropTypes from "prop-types";
import {saveEdit} from '../../../actions/productAction';

const {Option} = Select;

class ModalEditProduct extends Component {

  static propTypes = {
    isShow: PropTypes.bool,
    toggleOpen: PropTypes.func
  };

  handleOk = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSaveEdit(values);
      }
    });
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    const {product, units, specUnits} = this.props.productReducer;
    let specInit = [];
    if (product && product.specUnits && product.specUnits.length > 0) {
      product.specUnits.forEach((value) => {
        specInit.push(value.id);
      })
    }

    if (product.id)
      return (
        <div>
          <Form>
            <Modal
              title="Chỉnh sửa Sản Phẩm"
              visible={this.props.isShow}
              onCancel={this.props.toggleOpen}
              footer={[
                <Button key="submit" type="primary" onClick={this.handleOk}>
                  Lưu
                </Button>,
              ]}>
              <Form.Item style={{width: 0, padding: 0, margin: 0}}>
                {getFieldDecorator('id', {
                  initialValue: product.id
                })(
                  <Input style={{display: 'none'}}/>
                )}
              </Form.Item>
              <Form.Item label={'Tên sản phẩm'}>
                {getFieldDecorator('productName', {
                  initialValue: product.productName,
                  rules: [{required: true, message: 'Hãy nhập tên sản phẩm!'}],
                })(
                  <Input placeholder="Tên sản phẩm"/>
                )}
              </Form.Item>
              <Form.Item label={'Công dụng'}>
                {getFieldDecorator('virtue', {
                  initialValue: product.virtue,
                  rules: [{required: true, message: 'Hãy nhập công dụng'}],
                })(
                  <Input.TextArea rows={2} placeholder="Công dụng"/>
                )}
              </Form.Item>
              <Form.Item label={'Đơn Vị'}>
                {getFieldDecorator('unit', {
                  initialValue: product.unit.id,
                })(
                  <Select placeholder="Đơn vị">
                    {units.length > 0 && units.map((unit, idx) => (
                      <Option value={unit.id} key={idx}>{unit.unitName}</Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
              <Form.Item label={'Quy định đơn vị'}>
                {getFieldDecorator('specUnits', {
                  initialValue: specInit,
                })(
                  <Select placeholder="Đơn vị" mode={"multiple"}>
                    {specUnits.length > 0 && specUnits.map((specUnit, idx) => (
                      <Option
                        value={specUnit.id}
                        key={idx}>
                        {`${specUnit.unitIn.unitName} ${specUnit.amount} ${specUnit.unitOut.unitName}`}
                      </Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            </Modal>
          </Form>
        </div>
      );
    else return null;
  }
}

function mapStateToProps(state) {
  return {productReducer: state.productReducer};
}

const mapDispatchToProp = (dispatch) => ({
  onSaveEdit: (data) => dispatch(saveEdit(data))
});
const FormModalEditProduct = Form.create()(ModalEditProduct);
export default connect(
  mapStateToProps,mapDispatchToProp
)(FormModalEditProduct);
