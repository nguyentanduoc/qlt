import {combineReducers} from "redux";
import searchProductNameReducer from './searchProductNameReducer';
import mapReducer from './mapReducer'

export default combineReducers({
  mapReducer,
  searchProductNameReducer
});
