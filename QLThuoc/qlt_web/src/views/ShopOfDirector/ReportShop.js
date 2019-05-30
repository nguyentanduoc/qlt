import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card, CardBody, CardHeader, Col, Row} from "reactstrap";
import Widget02 from "../Widgets/Widget02";
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
              <Widget02
                mainText={"Tổng Nhân Viên"}
                icon="icon-people" color="info"
                header={report.totalEmployee ? report.totalEmployee.toString() : '0'}
                value="25"/>
            </Col>
            {/*<Col>*/}
            {/*  <Widget04*/}
            {/*    icon="icon-user-follow" color="success"*/}
            {/*    header={report.totalEmployeeJoinThisMonth ? report.totalEmployeeJoinThisMonth.toString() : '0'}*/}
            {/*    value="25"*/}
            {/*    invert>Nhân viên mới</Widget04>*/}
            {/*</Col>*/}
            <Col>
              <Widget02
                mainText={'Tổng Chi Nhánh'}
                icon="fas fa-code-branch"
                color="info"
                header={report.totalBranch ? report.totalBranch.toString() : '0'}/>
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
