import React, { Component } from 'react'
import { connect } from 'react-redux'
import DatePicker from 'react-datepicker'
import TableImport from './TableImport'
import { init } from '../../../actions/importProductAction'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Form,
  FormGroup,
  Label
} from 'reactstrap'
import AlertCommon from '../../Common/AlertCommon';
export class index extends Component {

  constructor(props){
    super(props);
    this.state = {
      createBillDate: new Date(),
    }
  }
  componentWillMount(){
    this.props.onInit();
  }
  onSubmit = (e) => {
    e.reventDefault();
  }
  onReset = (e) => {
    e.reventDefault();
  }
  handleChangeDate = (e) => {

  }
  render() {
    console.log(this.props.importRoductReducer)
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>Hóa Đơn Nhập</CardHeader>
          <CardBody>
            <AlertCommon/>
            <Form onSubmit={this.onSubmit.bind(this)} onReset = {this.onReset.bind(this)}>
              <FormGroup>
                <Label htmlFor="">Ngày Nhập</Label>
                <DatePicker
                      className="form-control"
                      selected={this.state.createBillDate}
                      dateFormat="dd/MM/yyyy"
                      onChange={this.handleChangeDate.bind(this)}/>
              </FormGroup>
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

export default connect(mapStateToProps, mapDispatchToProps)(index)
