import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import {Modal, Table} from "antd";
import NumberFormat from "react-number-format";
import Moment from "react-moment";

class ModalBill extends Component {
  static propTypes = {
    isShow: PropTypes.bool,
    toggleOpen: PropTypes.func
  }
  render() {
    const {detailExport} = this.props.exportReducer;
    return (
      <div>
        <Modal
          title="Chi tiết hóa đơn"
          visible={this.props.isShow}
          onOk={this.handleOk}
          onCancel={this.props.toggleOpen}>
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
          </Table>
        </Modal>
      </div>
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
