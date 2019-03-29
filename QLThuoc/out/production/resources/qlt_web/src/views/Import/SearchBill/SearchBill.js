import React, {Component} from 'react';
import {connect} from 'react-redux';

class SearchBill extends Component {
  render() {
    return (
      <div>
        SearchBill
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(
  mapStateToProps,
)(SearchBill);
