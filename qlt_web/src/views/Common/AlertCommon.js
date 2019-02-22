import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Alert } from 'reactstrap';

class AlertCommon extends Component {
  render() {
    return (
      <div>
        <Alert color={this.props.alertReducer.color} className="text-center" isOpen={this.props.alertReducer.isShow}>
          {this.props.alertReducer.message}
        </Alert>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  alertReducer: state.alertReducer
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(AlertCommon)
