import React, { Component } from 'react'
import { connect } from 'react-redux'
import { toggleModal } from '../../actions/shopAction'
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  ModalFooter
  } from 'reactstrap'

class ModalDetail extends Component {

  constructor(props){
    super(props)
    this.state = {
      primary:false
    }
  } 
  togglePrimary = (e) => {
    e.preventDefault();
    this.props.onToggleModel();
  }
  render() {
    console.log(this.props.shopReducer);
    return (
      <Modal isOpen={this.props.shopReducer.isOpenModal} toggle={this.togglePrimary.bind(this)}
        className={'modal-primary'}>
        <ModalHeader toggle={this.togglePrimary.bind(this)}>Modal title</ModalHeader>
        <ModalBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
          et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.togglePrimary.bind(this)}>Do Something</Button>{' '}
          <Button color="secondary" onClick={this.togglePrimary.bind(this)}>Cancel</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => ({
  shopReducer: state.shopReducer
})

const mapDispatchToProps = (dispatch) => ({
  onToggleModel: () => {
    return dispatch(toggleModal());
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalDetail)
