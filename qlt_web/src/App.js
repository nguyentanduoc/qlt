import React, {Component} from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import Loadable from 'react-loadable';
import './App.scss';
import {connect} from 'react-redux';
import PrivateRouter from './router/PrivateRouter';
import {notification} from 'antd';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = Loadable({
  loader: () => import('./containers/DefaultLayout'),
  loading
});

// Pages
const Login = Loadable({
  loader: () => import('./views/Pages/Login'),
  loading
});

const Register = Loadable({
  loader: () => import('./views/Pages/Register'),
  loading
});

const Page404 = Loadable({
  loader: () => import('./views/Pages/Page404'),
  loading
});

const Page500 = Loadable({
  loader: () => import('./views/Pages/Page500'),
  loading
});

const ChooseBranch = Loadable({
  loader: () => import('./views/Pages/ChooseBranch'),
  loading
});

class App extends Component {

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {isShow, color, message} = this.props.alertReducer;
    if (isShow === true && prevProps.alertReducer.isShow === false) {
      if (color === 'danger') {
        notification.error({
          message: 'Thông báo lỗi',
          description: message,
          placement: 'topRight',
          style:{
            top: 100,
          },
          onClick: () => {
          },
        });
      } else {
        notification.success({
          message: 'Thông báo',
          description: message,
          placement: 'topRight',
          style:{
            top: 100,
          },
          onClick: () => {
          },
        })
      }
    }
  }

  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/login" name="Login Page" component={Login}/>
          <Route exact path="/register" name="Register Page" component={Register}/>
          <Route exact path="/404" name="Page 404" component={Page404}/>
          <Route exact path="/500" name="Page 500" component={Page500}/>
          <Route exact path="/choose-branch" name="Chọn Chi Nhánh" component={ChooseBranch}/>
          <PrivateRouter path="/" name="Home" component={DefaultLayout} authed={this.props.auth.isLogin}/>
        </Switch>
      </HashRouter>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
});
const mapStateToProps = state => {
  return {
    auth: state.auth,
    alertReducer: state.alertReducer
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
