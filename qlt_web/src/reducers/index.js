import { combineReducers } from "redux";
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import userReducer from './UserPreducer';
import roleReducer from "./roleReducer";

export default combineReducers({
    error: errorReducer,
    auth: authReducer,
    user: userReducer,
    role: roleReducer
});