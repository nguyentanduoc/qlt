import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Alert } from 'reactstrap';
import {resetAlert} from '../../actions/alertAction';

class AlertCommon extends Component {
  componentDidMount() {
    this.props.onResetAlert();
  }

  render() {
    const {color,isShow, message} = this.props.alertReducer;
    return (
      <div>
        <Alert color={color} className="text-center" isOpen={isShow}>
          {message}
        </Alert>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  alertReducer: state.alertReducer
});

const mapDispatchToProps = (dispatch) => ({
  onResetAlert: () => dispatch(resetAlert())
});

export default connect(mapStateToProps, mapDispatchToProps)(AlertCommon)
