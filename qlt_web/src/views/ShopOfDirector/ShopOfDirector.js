import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Row, Col} from 'reactstrap';
import InfoShop from "./InfoShop";
import ReportShop from "./ReportShop";

class ShopOfDirector extends Component {
  render() {
    return (
      <Row>
        <Col md={5}>
          <InfoShop/>
        </Col>
        <Col md={7}>
          <ReportShop/>
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
)(ShopOfDirector);
