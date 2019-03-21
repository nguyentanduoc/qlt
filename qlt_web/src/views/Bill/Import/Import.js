import React, { Component } from 'react'
import { connect } from 'react-redux'
import TableImport from './TableImport'
import { init } from '../../../actions/importProductAction'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Form} from 'reactstrap'

class Import extends Component {
  componentWillMount(){
    this.props.onInit();
  }
  onSubmit = (e) => {
    e.reventDefault();
  }
  onReset = (e) => {
    e.reventDefault();
  }
  handleChangeDate = () => {

  }
  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>Hóa Đơn Nhập</CardHeader>
          <CardBody>
            <Form onSubmit={this.onSubmit.bind(this)} onReset = {this.onReset.bind(this)}>
              <TableImport/>
            </Form>
          </CardBody>
          <CardFooter></CardFooter>
        </Card>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  importRoductReducer: state.importRoductReducer
})

const mapDispatchToProps = (dispatch) => ({
  onInit: () => {
    return dispatch(init());
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Import)