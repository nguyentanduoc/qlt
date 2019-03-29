import React, { Component } from 'react'
import { connect } from 'react-redux'
import TableRequest from './TableRequest'

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
        <TableRequest/>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Request)
