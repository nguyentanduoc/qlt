import React, {Component} from 'react';
import {connect} from 'react-redux';

function mapStateToProps(state) {
  return {};
}

class ReportShop extends Component {
  render() {
    return (
      <div>
        Report
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
)(ReportShop);
