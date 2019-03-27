import React, {Component} from 'react';
import {connect} from 'react-redux';

class CreateBill extends Component {
  render() {
    return (
      <div>
        CreateBill
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(
  mapStateToProps,
)(CreateBill);
