import React, { Component } from 'react'
import { connect } from 'react-redux'

class Request extends Component {

  render() {
    return (
      <div>
        Request
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Request)
