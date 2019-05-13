import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card, CardBody, CardHeader, Col, Row} from "reactstrap";
import {Button, Form, Input, Table} from 'antd';
import {searchProductOnStore} from '../../actions/productAction';
import {countMemberOfBranch} from '../../actions/branchAction';
import Widget02 from "../Widgets/Widget02";

class BranchReport extends Component {
  render() {
    return (
      <div>
        <div className="animated fadeIn">
          <Row>
            <Col sm="6" md="2">
              <Widget04 icon="icon-people" color="info" header="87.500" value="25" invert>Tổng Nhân Viên</Widget04>
            </Col>
            <Col sm="6" md="2">
              <Widget04 icon="icon-user-follow" color="success" header="385" value="25" invert>Nhân viên mới</Widget04>
            </Col>
          </Row>
          <Row>
            <Col sm="6" md="2">
              <Widget04 icon="icon-people" color="info" header="87.500" value="25">Tổng Chi Nhánh</Widget04>
            </Col>
            <Col sm="6" md="2">
              <Widget04 icon="icon-user-follow" color="success" header="385" value="25">Chi Nhánh mới</Widget04>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}
export default connect(
  mapStateToProps,
)(BranchReport);
