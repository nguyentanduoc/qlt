import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import {Modal, Table} from "antd";
import NumberFormat from "react-number-format";

class ModalBill extends Component {
  static propTypes = {
    isShow: PropTypes.bool,
    toggleOpen: PropTypes.func
  }

  render() {
    const {detailExport} = this.props.exportReducer;
    return (
      <Modal
        title="Chi tiết hóa đơn"
        visible={this.props.isShow}
        onCancel={this.props.toggleOpen}
      footer={null}>
        <Table
          bordered={true}
          dataSource={detailExport}
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
            dataIndex='priceHistory'
            key='priceHistory'
            render={(priceHistory) => (
              <NumberFormat
                displayType={'text'}
                thousandSeparator={true} value={priceHistory.price}
                disabled={true}/>)}
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

function mapStateToProps(state) {
  return {
    exportReducer: state.exportReducer
  };
}

export default connect(
  mapStateToProps,
)(ModalBill);
