import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRouter = ({ component: Component, authed, ...rest }) => (
    <Route {...rest} render={props => (
        authed
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)

export default PrivateRouter