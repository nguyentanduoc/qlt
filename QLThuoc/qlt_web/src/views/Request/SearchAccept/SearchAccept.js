import React, {Component} from 'react';
import {connect} from 'react-redux';

class SearchAccept extends Component {
  render() {
    return (
      <div>
        SearchAccept
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(
  mapStateToProps,
)(SearchAccept);
