import React, {Component, Suspense} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {Container} from 'reactstrap';
import {connect} from 'react-redux';
import {logout} from '../../actions/authenAction';
import {resetAlert} from '../../actions/alertAction'
import _ from 'lodash';
import {
  AppAside,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
// import {NavConfig} from '../../_nav';
// routes config
import routes from '../../routes';

const DefaultAside = React.lazy(() => import('./DefaultAside'));
const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

class DefaultLayout extends Component {

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>;

  signOut = async (e) => {
    e.preventDefault();
    await this.props.onLogout();
  };

  componentDidUpdate() {
    if (!this.props.authReducer.isLogin) {
      this.props.history.push('/login');
      this.props.onResetAlert();
    }
  }

  render() {
    let items = {items: this.props.authReducer.nav};
    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense fallback={this.loading()}>
            <DefaultHeader onLogout={e => this.signOut(e)}/>
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader/>
            <AppSidebarForm/>
            <Suspense>
                {items.items === null || items.items.length <= 0 ? null : (<AppSidebarNav navConfig={items} {...this.props} />)}
            </Suspense>
            <AppSidebarFooter/>
            <AppSidebarMinimizer/>
          </AppSidebar>
          <main className="main">
            {/*<AppBreadcrumb appRoutes={routes}/>*/}
            <Container fluid className={'pt-3'}>
              <Suspense fallback={this.loading()}>
                <Switch>
                  {
                    routes.map((route, idx) => {
                      if (route.component && _.intersectionWith(this.props.authReducer.authorities, route.roles, _.isEqual)) {
                        if (typeof (route.isMainBranch)==='boolean' ) {
                          if (this.props.authReducer.branch &&
                            this.props.authReducer.branch.isMain === route.isMainBranch) {
                            return (<Route
                              key={idx}
                              path={route.path}
                              exact={route.exact}
                              name={route.name}
                              render={props => (
                                <route.component {...props} />
                              )}/>)
                          } else {
                            return null;
                          }
                        } else {
                          return (<Route
                            key={idx}
                            path={route.path}
                            exact={route.exact}
                            name={route.name}
                            render={props => (
                              <route.component {...props} />
                            )}/>)
                        }
                      } else {
                        return null;
                      }
                    })
                  }
                  <Redirect from="/" to="/dashboard"/>
                </Switch>
              </Suspense>
            </Container>
          </main>
          <AppAside fixed>
            <Suspense fallback={this.loading()}>
              <DefaultAside/>
            </Suspense>
          </AppAside>
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter/>
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authReducer: state.auth
  }
};
const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => {
      return dispatch(logout());
    },
    onResetAlert: () => {
      return dispatch(resetAlert());
    }
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(DefaultLayout);
