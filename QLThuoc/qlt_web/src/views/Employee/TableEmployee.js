import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card, CardBody, CardHeader} from 'reactstrap';

function mapStateToProps(state) {
  return {};
}

class TableEmployee extends Component {
  render() {
    return (
      <Card>
        <CardHeader>
          Danh sách Nhân Viên
        </CardHeader>
        <CardBody>

        </CardBody>
      </Card>
    );
  }
}

export default connect(
  mapStateToProps,
)(TableEmployee);
