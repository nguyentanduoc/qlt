import {combineReducers} from "redux";
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import userReducer from './UserPreducer';
import roleReducer from './roleReducer';
import navReducer from './navReducer';
import alertReducer from './alertReducer';
import paginationReducer from './paginationReducer';
import appSettingReducer from './appSettingReducer';
import branchReducer from './branchReducer';
import shopReducer from './shopReducer';
import employeeReducer from './employeeReducer';
import importProductReducer from './importProductReducer';
import productReducer from './productReducer';
import requestReducer from './requestReducer';
import acceptReducer from './acceptReducer';
import exportReducer from './exportReducer';
import specLevelBranchReducer from './specLevelBranchReducer';
import shopOfDirectorReducer from './shopOfDirectorReducer';
import employeeOfBranchReducer from './employeeOfBranchReducer';
import producerReducer from './producerReducer';
import specUnitReducer from './specUnitReducer';

export default combineReducers({
  error: errorReducer,
  auth: authReducer,
  user: userReducer,
  role: roleReducer,
  navReducer,
  alertReducer,
  paginationReducer,
  appSettingReducer,
  branchReducer,
  shopReducer,
  employeeReducer,
  importProductReducer,
  productReducer,
  requestReducer,
  acceptReducer,
  exportReducer,
  specLevelBranchReducer,
  shopOfDirectorReducer,
  employeeOfBranchReducer,
  producerReducer,
  specUnitReducer
});
