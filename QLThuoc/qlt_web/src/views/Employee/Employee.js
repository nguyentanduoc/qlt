import React, { Component } from 'react'
import { connect } from 'react-redux'
import FormEmployee from './FormEmployee'
import {
  Row,
  Col,
} from 'reactstrap'
import TableEmployee from "./TableEmployee";

export class Employee extends Component {

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col md="4">
            <FormEmployee/>
          </Col>
          <Col md="8">
            <TableEmployee/>
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  branchReducer: state.branchReducer
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Employee)
