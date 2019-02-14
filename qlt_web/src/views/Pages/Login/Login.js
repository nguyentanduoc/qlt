import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import { login } from '../../../actions/authenAction';
import { resetError } from '../../../actions/errorAction';

class Login extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
        usernameOrEmail: '',
        password: ''
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keyup', this.handleKeUpEnter.bind(this));
  }

  changeHandler = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
          [name]: value
    });
  }
  handleSubmit = async (event) => {
    event.preventDefault();
    const auth = {
      usernameOrEmail: this.state.usernameOrEmail,
      password: this.state.password
    };
    await this.props.onLogin(auth);
    if(this.props.auth.isLogin === true) {
      this.props.history.push('/dashboard');
    }
  }

  handleKeUpEnter = (event) => {
    if (event.key === 'Enter') {
      this.handleSubmit(event);
    }
  }
  componentWillUnmount(){
    if( this.props.error.isErrored === true ) {
      this.props.onResetError();
    }

    document.removeEventListener('keyup', this.handleKeUpEnter.bind(this));
  }
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <Alert color="danger" isOpen={this.props.error.isShowAlert}>
                         {this.props.error.errorMessage}
                      </Alert>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          id="usernameOrEmail"
                          name="usernameOrEmail"
                          type="text"
                          placeholder="usernameOrEmail"
                          autoComplete="usernameOrEmail"
                          onChange = {this.changeHandler}/>
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          id="password"
                          name="password"
                          type="password"
                          placeholder="******"
                          autoComplete="password"
                          onChange = {this.changeHandler}/>
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4" type="submit" onClick={this.handleSubmit}>Login </Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Forgot password?</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
                      <Link to="/register">
                        <Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth : state.auth,
    error: state.error
  }
}
const mapDispathToProps = (dispatch, props) => {
  return {
    onLogin : async (auth) => {
      return dispatch(login(auth));
    },
    onResetError: () => {
      return dispatch(resetError());
    }
  }
}
export default connect(mapStateToProps,mapDispathToProps) (Login);
