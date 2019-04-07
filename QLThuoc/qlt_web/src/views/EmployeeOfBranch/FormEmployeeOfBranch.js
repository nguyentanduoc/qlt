import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Form} from 'antd';
import {Card, CardHeader, CardFooter, CardBody, Input, FormGroup, Label, Col, Button} from 'reactstrap';
import AlertCommon from "../Common/AlertCommon";
import NumberFormat from "react-number-format";
import Select from "react-select";

class FormEmployeeOfBranch extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: '',
      nameEmployee: '',
      numberPhone: '',
      username: '',
      roles: []
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
  }
  handleReset = (e) => {
    e.preventDefault();
    console.log("reset");
  }
  componentWillMount() {

  }

  render() {
    return (
      <div>fixing</div>
    );
  }
}
const createFormEmployeeOfBranch = Form.create()(FormEmployeeOfBranch);

const mapStateToProps = (state) => ({
});
const mapDispatchToProps = (dispatch) =>({
});


export default connect(
  mapStateToProps,mapDispatchToProps
)(createFormEmployeeOfBranch);
