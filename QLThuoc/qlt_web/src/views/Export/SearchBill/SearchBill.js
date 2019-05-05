import React, { Component } from 'react'
import { connect } from 'react-redux'

export class SearchBill extends Component {
  render() {
    return (
      <div>
        <h1>SearchBill</h1>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBill)
