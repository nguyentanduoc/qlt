import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Row, Col} from 'reactstrap';
import FormEmployeeOfBranch from './FormEmployeeOfBranch'
import TableEmployeeOfBranch from "./TableEmployeeOfBranch";

class EmployeeOfBranch extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col md={4}><FormEmployeeOfBranch/></Col>
          <Col md={8}><TableEmployeeOfBranch/></Col>
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
