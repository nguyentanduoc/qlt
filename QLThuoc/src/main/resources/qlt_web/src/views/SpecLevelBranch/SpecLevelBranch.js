import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Col, Row} from 'reactstrap';
import {Form} from 'antd';
import FormSpecLevelBranch from "./FormSpecLevelBranch";
import TableSpecLevelBranch from './TableSpecLevelBranch';

class SpecLevelBranch extends Component {
  render() {
    return (
      <Row>
        <Col md={5}>
          <FormSpecLevelBranch/>
        </Col>
        <Col md={7}>
          <TableSpecLevelBranch/>
        </Col>
      </Row>
    );
  }
}

function mapStateToProps(state) {
  return {};
}
export default connect(
  mapStateToProps,
)(SpecLevelBranch);
