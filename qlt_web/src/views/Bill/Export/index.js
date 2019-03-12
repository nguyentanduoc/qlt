import React, { Component } from 'react'
import { connect } from 'react-redux'

export class index extends Component {
  render() {
    return (
      <div>
        <h1>Sell</h1>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(index)
