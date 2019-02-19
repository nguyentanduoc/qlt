import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { toggleModal } from '../../actions/branchAction'
import {
  Row,
  Col,
  Form,
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  InputGroup, 
  InputGroupAddon,
  CardFooter,
  } from 'reactstrap'
import FormBrach from  './FormBranch'

export class index extends Component {
  // static propTypes = {
  //   prop: PropTypes
  // }
  handleAdd = (e) => {
    e.preventDefault();
    this.props.onToggleModal();
  }
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col md="8">
            <Card>
              <CardHeader>
                  <i className="fas fa-list-alt"></i> Danh Sách <strong>Tài Khoản</strong>
              </CardHeader>
              <CardBody>
                <Row className="align-items-center">
                  <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                    <Button block color="primary" onClick={this.handleAdd.bind(this)}><i className="fas fa-plus"></i></Button>
                  </Col>
                </Row>
              
              {/* <Form onSubmit={this.handleSubmit.bind(this)} className='form-inline justify-content-end pb-2'>
                      <InputGroup className="float-righ">
                        <Input type="text" id="txtCondition" name="txtCondition" placeholder="Email hoặc Tên" onChange={this.changeHandler.bind(this)}/>
                        <InputGroupAddon addonType="append">
                          <Button type="submit" color="primary" className="btn-square"><i className="fas fa-search"></i></Button>
                        </InputGroupAddon>
                      </InputGroup>
                      <Button color='warning' className="btn-square ml-1" disabled={this.state.selectedRowKeys.length > 0 ? false : true} onClick={this.handleDeletedRow.bind(this)}><i className="far fa-trash-alt"></i></Button>
                </Form> */}
                {/* <Table
                  className="table table-bordered"
                  rowKey='id'
                  columns={this.state.columns}
                  dataSource={this.props.userReducer.users}
                  pagination = {false}
                  rowSelection={rowSelection}
                  onRow={onRow}
                /> */}
              </CardBody>
              <CardFooter className='float-right'>
                {/* <PaginationCommon className='pt-2'/> */}
              </CardFooter>
            </Card>
          </Col>
          <Col>
              <FormBrach/>
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = (dispatch) => ({
  onToggleModal: () => {
    return dispatch(toggleModal());
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(index)
