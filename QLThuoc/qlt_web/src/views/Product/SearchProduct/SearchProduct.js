import React, {Component} from 'react';
import {connect} from 'react-redux';

class SearchProduct extends Component {
  render() {
    return (
      <div>
        ProductAction
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(
  mapStateToProps,
)(SearchProduct);
