import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Modal, Table} from "antd";
import NumberFormat from "react-number-format";
import PropTypes from "prop-types";

class ModalDetail extends Component {

  static propTypes = {
    isShow: PropTypes.bool,
    toggleOpen: PropTypes.func
  };

  render() {
    const {detail} = this.props.importProductReducer;
    return (
      <Modal
        title="Chi tiết hóa đơn"
        visible={this.props.isShow}
        onCancel={this.props.toggleOpen}
        footer={null}>
        <Table
          bordered={true}
          dataSource={detail}
          rowKey={'product'}>
          <Table.Column
            title='Sản Phẩm'
            dataIndex='product'
            key='product'
            render={(product) => (<div>{product.productName}</div>)}
          />
          <Table.Column
            title='Số lượng'
            dataIndex='amount'
            key='amount'
          />
          <Table.Column
            title='Đơn giá'
            dataIndex='price'
            key='price'
            render={(price) => (
              <NumberFormat
                displayType={'text'}
                thousandSeparator={true} value={price}
                className={'text-right'} disabled={true}/>)}
          />
          <Table.Column
            title='Đơn vị'
            dataIndex='specUnit'
            key='specUnit'
            render={(specUnit) => (
              <div>{specUnit.unitIn.unitName} {specUnit.amount} {specUnit.unitOut.unitName}</div>)}
          />
        </Table>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  importProductReducer: state.importProductReducer
})

export default connect(
  mapStateToProps,
)(ModalDetail);
