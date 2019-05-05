import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Col, Row} from "reactstrap";
import Widget04 from "../Widgets/Widget04";

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
