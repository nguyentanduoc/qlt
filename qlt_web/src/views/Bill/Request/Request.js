import React, { Component } from 'react'
import { connect } from 'react-redux'
import TableRequest from './TableRequest'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Form} from 'reactstrap'

class Request extends Component {
  onSubmit = (e) => {
    e.preventDefault();
  }
  onReset = (e) => {
    e.preventDefault();
  }
  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>Yêu Cầu Nhập Sản Phẩm</CardHeader>
          <CardBody>
            <Form onSubmit={this.onSubmit.bind(this)} onReset = {this.onReset.bind(this)}>
              <TableRequest/>
            </Form>
          </CardBody>
          <CardFooter></CardFooter>
        </Card>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Request)
