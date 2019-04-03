import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Alert } from 'reactstrap';

class AlertCommon extends Component {
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

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(AlertCommon)
