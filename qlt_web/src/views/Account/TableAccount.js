import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import BootstrapTable from 'react-bootstrap-table-next';

export class TableAccount extends Component {
  static propTypes = {
    data: PropTypes.array
  }

  render() {
    const {data} = this.props;
    return (
    <div></div>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(TableAccount)
