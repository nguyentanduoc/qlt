import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Col, Row} from "reactstrap";
import Widget04 from "../Widgets/Widget04";
import {getReportShop} from '../../actions/shopOfDirectorAction';

class ReportShop extends Component {
  componentWillMount() {
    this.props.onGetReportShop();
  }

  render() {
    const {report} = this.props.shopOfDirectorReducer;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col sm="6" md="2">
            <Widget04
              icon="icon-people" color="info"
              header={report.totalEmployee ? report.totalEmployee.toString() : '0'}
              value="25"
              invert>Tổng Nhân Viên</Widget04>
          </Col>
          <Col sm="6" md="2">
            <Widget04
              icon="icon-user-follow" color="success"
              header={report.totalEmployeeJoinThisMonth ? report.totalEmployeeJoinThisMonth.toString() : '0'}
              value="25"
              invert>Nhân viên mới</Widget04>
          </Col>
          <Col sm="6" md="2">
            <Widget04
              icon="fas fa-code-branch"
              color="info"
              header={report.totalBranch ? report.totalBranch.toString() : '0'}
              value="25">Tổng Chi Nhánh</Widget04>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    shopOfDirectorReducer: state.shopOfDirectorReducer
  };
}

const mapDispatchToProps = (dispatch) => ({
  onGetReportShop: () => dispatch(getReportShop()),
});
export default connect(
  mapStateToProps, mapDispatchToProps
)(ReportShop);
