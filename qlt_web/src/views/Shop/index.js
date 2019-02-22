import React, { Component } from 'react'
import { connect } from 'react-redux'
import FormShop from './FormShop'
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Badge,
  Form,
  Input,
  InputGroupAddon,
  Button,
  InputGroup
  } from 'reactstrap'
class index extends Component {

  render() {
  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12" lg="8">
          <Card>
            <CardHeader>
              <i className="fas fa-store"></i>Danh sách <strong>Cửa hàng</strong>
            </CardHeader>
            <CardBody>
              {/* <Table responsive className="table-hover">

              </Table> */}
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" lg="4">
          <FormShop/>
        </Col>
      </Row>
    </div>
  )}
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(index)
