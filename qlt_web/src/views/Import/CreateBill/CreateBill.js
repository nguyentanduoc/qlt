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

class CreateBill extends Component {
  componentWillMount(){
    this.props.onInit();
  }
  onSubmit = (e) => {
    e.preventDefault();
  }
  onReset = (e) => {
    e.preventDefault();
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
  importProductReducer: state.importProductReducer
})

const mapDispatchToProps = (dispatch) => ({
  onInit: () => {
    return dispatch(init());
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateBill)
