import React, {Component} from 'react';
import {Button } from "antd";
import {
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  Alert
} from 'reactstrap';
import {connect} from 'react-redux';
import {login, setLoading} from '../../../actions/authenAction';
import {resetError} from '../../../actions/errorAction';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameOrEmail: '',
      password: '',
      loading: false
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
    this.props.onSetLoading();
    const auth = {
      usernameOrEmail: this.state.usernameOrEmail,
      password: this.state.password
    };
    await this.props.onLogin(auth);
  }

  handleKeUpEnter = (event) => {
    if (event.key === 'Enter') {
      this.handleSubmit(event);
    }
  }

  componentWillUnmount() {
    this.props.onResetError();
    document.removeEventListener('keyup', this.handleKeUpEnter.bind(this));
  }

  componentDidUpdate() {
    if (this.props.auth.isLogin) {
      if (this.props.auth.isChooseBranch) {
        this.props.history.push('/choose-branch');
      } else {
        this.props.history.push('/dashboard');
      }
    }
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="5">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form>
                      <h1>Đăng nhập</h1>
                      <p className="text-muted">Điền thông tin tài khoản của bạn</p>
                      <Alert color="danger" isOpen={this.props.error.isShowAlert}>
                        {this.props.error.errorMessage}
                      </Alert>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"/>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          id="usernameOrEmail"
                          name="usernameOrEmail"
                          type="text"
                          placeholder="Tên tài khoản"
                          autoComplete="usernameOrEmail"
                          onChange={this.changeHandler}/>
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"/>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          id="password"
                          name="password"
                          type="password"
                          placeholder="Mật khẩu"
                          autoComplete="password"
                          onChange={this.changeHandler}/>
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button
                            htmlType={'submit'}
                            loading={this.props.auth.isLoading}
                            type="primary"
                            onClick={this.handleSubmit}>Đăng nhập
                          </Button>
                        </Col>
                        {/*<Col xs="6" className="text-right">*/}
                          {/*<Button color="link" className="px-0">Quên mật khẩu?</Button>*/}
                        {/*</Col>*/}
                      </Row>
                    </Form>
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
    auth: state.auth,
    error: state.error
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: async (auth) => {
      return dispatch(login(auth));
    },
    onResetError: () => {
      return dispatch(resetError());
    },
    onSetLoading: () => {
      return dispatch(setLoading());
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
