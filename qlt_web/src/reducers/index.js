import { combineReducers } from "redux";
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import userReducer from './UserPreducer';
import roleReducer from './roleReducer';
import navReducer from './navReducer';
import alertReducer from './alertReducer';
import paginationReducer from './paginationReducer';
import appSettingReducer from './appSettingReducer';

export default combineReducers({
    error: errorReducer,
    auth: authReducer,
    user: userReducer,
    role: roleReducer,
    navReducer,
    alertReducer,
    paginationReducer,
    appSettingReducer
});