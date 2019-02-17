import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Pagination, PaginationItem, PaginationLink} from 'reactstrap'
import { clicked } from '../../actions/paginationAction'


export class PaginationCommon extends Component {

  handleClicked = (gotoPage) => {
    this.props.onGotoPage(gotoPage);
  }
  renderPageItem = () => {
    let page = [];
    for(let i = 0; i < this.props.paginationReducer.totalPages; i++) {
      let active = (this.props.paginationReducer.number === i) ? true: false;
      page.push(
        <PaginationItem
          key={i} 
          active={active}>
            <PaginationLink tag="button" onClick={this.handleClicked.bind(this, i)} disabled={active}>
              {i + 1}
            </PaginationLink>
        </PaginationItem>
      )
    }
    return page;
  }
  render() {
    if(this.props.paginationReducer.show)
      return (
        <nav>
          <Pagination>
            <PaginationItem disabled>
              <PaginationLink previous tag="button" onClick={this.handleClicked.bind(this,'previous')} />
            </PaginationItem>
              {this.renderPageItem()}
            <PaginationItem >
              <PaginationLink next tag="button" onClick={this.handleClicked.bind(this,'next')}/>
            </PaginationItem>
          </Pagination>
        </nav>
      )
    else return (<nav></nav>)
  }
}

const mapStateToProps = (state) => ({
  paginationReducer: state.paginationReducer
})

const mapDispatchToProps = (dispatch) => {
  return {
    onGotoPage: async (gotoPage) => {
      return await dispatch(clicked(gotoPage))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaginationCommon)
