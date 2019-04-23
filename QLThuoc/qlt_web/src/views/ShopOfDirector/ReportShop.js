import React, {Component} from 'react';
import {connect} from 'react-redux';
import {CardGroup, Col, Row} from "reactstrap";
import {Line} from "react-chartjs-2";
import Widget01 from "../Widgets/Widget01";
import Widget02 from "../Widgets/Widget02";
import Widget03 from "../Widgets/Widget03";
import Widget04 from "../Widgets/Widget04";

function mapStateToProps(state) {
  return {};
}

class ReportShop extends Component {
  render() {
    return (
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
    );
  }
}

export default connect(
  mapStateToProps,
)(ReportShop);
