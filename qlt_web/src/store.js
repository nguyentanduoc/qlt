import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import logger from 'redux-logger';

const initialState = {};

// const ReactReduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

let store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(
      thunk,
      logger,
    ))

// if (window.navigator.userAgent.includes("Chrome") && ReactReduxDevTools) {
//     store = createStore(
//         rootReducer,
//         initialState,
//         compose(
//             applyMiddleware(...middleware, logger()),
//             ReactReduxDevTools
//         )
//     );
// } else {
//     store = createStore(
//         rootReducer,
//         initialState,
//         compose(
//             applyMiddleware(middleware)
//         )
//     );
// }
export default store;