import {API, ACTION_TYPES} from '../constants'
import Axios from 'axios';
import header from '../helpers/headerHelper';
import {showAlertFail, showAlertAndReset} from './alertAction';

export const init = () => {
  return async (dispatch) => {
    try {
      const response = await Axios.post(API.PRODUCT.INIT, null, header);
      dispatch(initSuccess(response.data));
    } catch (err) {
      dispatch(showAlertFail(err));
    }
  }
};
export const save = (form) => {
  return async (dispatch) => {
    try {
      await Axios.post(API.PRODUCT.SAVE, form, header);
      dispatch(showAlertAndReset());
    } catch (err) {
      dispatch(showAlertFail(err));
    }
  }
};
export const initSuccess = (data) => {
  return {
    type: ACTION_TYPES.PRODUCT.INIT_SUCCESS,
    payload: data
  }
};
export const search = (condition) => (
  async dispatch => {
    try {
      const response = await Axios.post(API.PRODUCT.SEARCH, condition, header);
      dispatch(searchSuccess(response.data));
    } catch (e) {
      dispatch(showAlertFail(e));
    }
  }
);
const searchSuccess = (data) => ({
  type: ACTION_TYPES.PRODUCT.SEARCH_SUCCESS,
  payload: data
})
