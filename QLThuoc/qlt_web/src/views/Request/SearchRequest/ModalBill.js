import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import {Modal, Table} from 'antd';

class ModalBill extends Component {
  static propTypes = {
    isShow: PropTypes.bool,
    toggleOpen: PropTypes.func,
    idBill: PropTypes.number
  };

  handleCancel() {
    this.props.toggleOpen();
  }

  render() {
    const {details} = this.props.requestReducer;
    console.log(details);
    return (
      <Modal
        title="Chi Tiết Yêu Cầu"
        visible={this.props.isShow}
        onCancel={this.handleCancel.bind(this)}
        footer={null}
      >
        <Table dataSource={details} bordered={true} size={'small'} rowKey={'product'}>
          <Table.Column
            title='Tên Sản Phẩm'
            dataIndex='product'
            key='product'/>
          <Table.Column
            title='Số Lượng'
            dataIndex='amount'
            key='amount'/>
          <Table.Column
            title='Đơn vị'
            dataIndex='unit'
            key='unit'/>
        </Table>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    requestReducer: state.requestReducer
  };
}

const mapDispatchToProps = (dispatch) => ({
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(ModalBill);
