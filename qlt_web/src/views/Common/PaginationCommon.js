import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { PaginationItem, PaginationLink} from 'reactstrap'
import { clicked } from '../../actions/paginationAction'
import UltimatePagination from 'react-ultimate-pagination-bootstrap-4';


export class PaginationCommon extends Component {

  // handleClicked = (gotoPage) => {
  //   this.props.onGotoPage(gotoPage);
  // }
  // renderPageItem = () => {
  //   let page = [];
  //   for(let i = 0; i < this.props.paginationReducer.totalPages; i++) {
  //     let active = (this.props.paginationReducer.number === i) ? true: false;
  //     page.push(
  //       <PaginationItem
  //         key={i} 
  //         active={active}>
  //           <PaginationLink tag="button" onClick={this.handleClicked.bind(this, i)} disabled={active}>
  //             {i + 1}
  //           </PaginationLink>
  //       </PaginationItem>
  //     )
  //   }
  //   return page;
  // }
  onPageChange = (e) => {
    if(this.props.paginationReducer.number !== e)
    this.props.onGotoPage(e);
  }
  render() {
    return(
    <UltimatePagination 
      currentPage={this.props.paginationReducer.number} 
      totalPages={this.props.paginationReducer.totalPages} 
      onChange={this.onPageChange.bind(this)}
    />
    )
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
