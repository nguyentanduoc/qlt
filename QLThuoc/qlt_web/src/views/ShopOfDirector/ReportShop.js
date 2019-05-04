import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Col, Row, Card, CardHeader, CardBody} from "reactstrap";
import Widget04 from "../Widgets/Widget04";
import {getReportShop} from '../../actions/shopOfDirectorAction';

class ReportShop extends Component {
  componentWillMount() {
    this.props.onGetReportShop();
  }

  render() {
    const {report} = this.props.shopOfDirectorReducer;
    return (
      <Card className={'card-accent-primary card'}>
        <CardHeader>Thống Kê</CardHeader>
        <CardBody>
          <Row>
            <Col>
              <Widget04
                icon="icon-people" color="info"
                header={report.totalEmployee ? report.totalEmployee.toString() : '0'}
                value="25"
                invert>Tổng Nhân Viên</Widget04>
            </Col>
            <Col>
              <Widget04
                icon="icon-user-follow" color="success"
                header={report.totalEmployeeJoinThisMonth ? report.totalEmployeeJoinThisMonth.toString() : '0'}
                value="25"
                invert>Nhân viên mới</Widget04>
            </Col>
            <Col>
              <Widget04
                icon="fas fa-code-branch"
                color="info"
                header={report.totalBranch ? report.totalBranch.toString() : '0'}
                value="25">Tổng Chi Nhánh</Widget04>
            </Col>
          </Row>
        </CardBody>
      </Card>
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
