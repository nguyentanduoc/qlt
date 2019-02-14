import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createUserOfRoleDirector, searchUser } from '../../actions/UserAction'
import { Row, Col, Form, Card, CardHeader, CardBody, FormGroup, Label, Input, Button } from 'reactstrap';

export class index extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            txtEmail: '',
            txtName: ''
        };
      }
    changeHandler = event => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
              [name]: value
        });
      }
    
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(e);
        this.props.onSearchUser(this.state);
    }
  render() {
    return (
        <div className="animated fadeIn">
            <Row>
                <Col md="6">
                    <Form onSubmit={this.handleSubmit.bind()}>
                        <Card>
                            <CardHeader>
                                <i className="fas fa-search"></i>Tìm tài khoản
                                <Button type="submit" size="sm" color="primary" className="float-right">
                                    <i className="fas fa-search"></i>
                                </Button>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="txtEmail">Email</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input type="email" id="txtEmail" name="txtEmail" placeholder="Email" onChange={this.changeHandler.bind(this)}/>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="txtName">Tên Tài Khoản</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input type="txt" id="txtName" name="txtName" placeholder="Tên Tài Khoản" onChange={this.changeHandler.bind(this)}/>
                                    </Col>
                                </FormGroup>
                            </CardBody>
                        </Card>
                    </Form>
                </Col>
                <Col md="6">
                    
                </Col>
            </Row>
            <Row>
            </Row>
        </div>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = (dispatch, props) => {
    return {
      onCreate : async (auth) => {
        return dispatch(createUserOfRoleDirector(auth))
      },
      onSearchUser: async (coditions) => {
          return dispatch(searchUser(coditions))
      }
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(index)
