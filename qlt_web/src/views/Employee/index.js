import React, { Component } from 'react'
import { connect } from 'react-redux'
import FormEmployee from './FormEmployee'
import {
  Row,
  Col,
  } from 'reactstrap'

export class index extends Component {

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col md="8">
          </Col>
          <Col md="4">
              <FormEmployee/>
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

export default connect(mapStateToProps, mapDispatchToProps)(index)
