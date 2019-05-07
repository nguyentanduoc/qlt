import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import {Modal, Table} from 'antd';
import Moment from "react-moment";
import NumberFormat from "react-number-format";

class ModalInfoProduct extends Component {

  static propTypes = {
    isShow: PropTypes.bool,
    toggleOpen: PropTypes.func
  };
  state = { visible: false };
  render() {
    return (
      <div>
        <Modal
          title="Lịch sử giá Sản Phẩm"
          visible={this.props.isShow}
          onCancel={this.props.toggleOpen}
          footer={null}
        >
          <Table
            bordered={true}
            dataSource={this.props.productReducer.priceHistories}
            rowKey={'id'}>
            <Table.Column
              title='#'
              dataIndex='id'
              key='id'/>
            <Table.Column
              title='Giá'
              dataIndex='price'
              key='price'
              render={(price) => (
                <NumberFormat displayType={'text'} thousandSeparator={true} value={price}
                              className={'form-control text-right'}/>
              )}
            />
            <Table.Column
              title='Ngày thay đổi'
              dataIndex='date'
              key='date'
              render={(text) => (<Moment format="HH:SS DD/MM/YYYY">{text}</Moment>)}
            />
          </Table>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    productReducer: state.productReducer
  };
}

export default connect(
  mapStateToProps,
)(ModalInfoProduct);
