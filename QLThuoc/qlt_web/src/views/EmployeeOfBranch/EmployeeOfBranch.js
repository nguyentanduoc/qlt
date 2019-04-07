import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Row, Col} from 'reactstrap';
import FormEmployeeOfBranch from './FormEmployeeOfBranch'

class EmployeeOfBranch extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col md={4}><FormEmployeeOfBranch/></Col>
          <Col md={8}></Col>
        </Row>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {};
}

export default connect(
  mapStateToProps,
)(EmployeeOfBranch);
