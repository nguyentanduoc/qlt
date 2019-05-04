import React, {Component} from 'react';
import {Button} from "antd";
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
import {ROLES} from '../../../constants';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameOrEmail: 'ntxuan',
      password: '12345678x@X',
      // usernameOrEmail: 'trungsonadmin',
      // password: 'aZEnDdzczP'
      isLoading: false
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.keyEnterUp = this.handleKeUpEnter.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keyup', this.keyEnterUp);
  }

  changeHandler = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const auth = {
      usernameOrEmail: this.state.usernameOrEmail,
      password: this.state.password
    };
    await this.props.onLogin(auth);
  };

  handleKeUpEnter = (event) => {
    if (event.key === 'Enter') {
      return this.handleSubmit(event);
    }
  };

  componentWillUnmount() {
    window.removeEventListener('keyup', this.keyEnterUp);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {isLogin, authorities} = this.props.auth;
    if (isLogin) {
      if (authorities.findIndex(authority => authority === ROLES.ROLE_LEADER) !== -1)
        this.props.history.push('/control-branch/report');
      else if (authorities.findIndex(authority => authority === ROLES.ROLE_ADMIN) !== -1)
        this.props.history.push('/admin/shop');
      else if (this.props.auth.isChooseBranch)
        this.props.history.push('/choose-branch');
      else this.props.history.push('/dashboard');
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
                          value={this.state.usernameOrEmail}
                          // autoComplete="usernameOrEmail"
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
                          // autoComplete="password"
                          value={this.state.password}
                          onChange={this.changeHandler}/>
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button
                            loading={this.state.isLoading}
                            htmlType={'submit'}
                            type="primary"
                            onClick={this.handleSubmit}>Đăng nhập
                          </Button>
                        </Col>
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
};
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
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
