import {combineReducers} from "redux";
import defaultReducer from './default';
import searchProductNameReducer from './searchProductNameReducer';

export default combineReducers({
  defaultReducer,
  searchProductNameReducer
});
