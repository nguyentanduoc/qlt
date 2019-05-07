import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Collapse, Form, Icon, InputNumber, Select} from 'antd';
import {getAllUnit, saveUnit} from '../../../actions/specUnit';

const Panel = Collapse.Panel;

const customPanelStyle = {
  background: '#f7f7f7',
  borderRadius: 4,
  marginBottom: 24,
  border: 0,
  overflow: 'hidden',
};


class CreateNewSpec extends Component {

  componentWillMount() {
    this.props.onGetAllUnit();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSaveUnit(values);
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

  hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }

  render() {
    const {units} = this.props.specUnitReducer;
    const {getFieldDecorator, getFieldsError} = this.props.form;
    return (
      <div>
        <Collapse
          bordered={false}
          expandIcon={({isActive}) => <Icon type="caret-right" rotate={isActive ? 90 : 0}/>}>
          <Panel header="Tạo mới quy định đơn vị" key="1" style={customPanelStyle}>
            <Form>
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
              <Button
                type="primary"
                disabled={this.hasErrors(getFieldsError())}
                onClick={this.handleSubmit}>
                Lưu
              </Button>
            </Form>
          </Panel>
        </Collapse>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    specUnitReducer: state.specUnitReducer
  };
}

const mapDispatchToProp = (dispatch) => ({
    onGetAllUnit: () => dispatch(getAllUnit()),
    onSaveUnit: (data) => dispatch(saveUnit(data))
  })
;

const FromCreateNewSpec = Form.create()(CreateNewSpec);

export default connect(
  mapStateToProps, mapDispatchToProp
)(FromCreateNewSpec);
