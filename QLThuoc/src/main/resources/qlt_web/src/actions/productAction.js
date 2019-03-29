import { API, ACTION_TYPES } from '../constants'
import Axios from 'axios';
import header from '../helpers/headerHelper';
import { showAlertFail, showAlertAndReset } from './alertAction';

export const init  = () => {
  return async (dispatch) => {
    try {
      const response = await Axios.post(API.PRODUCT.INIT, null, header);
      dispatch(initSuccess(response.data));
    } catch (err) {
      dispatch(showAlertFail(err));
    }
  }
}

export const save = (form) => {
  return async (dispatch) => {
    try {
      await Axios.post(API.PRODUCT.SAVE, form, header);
      dispatch(showAlertAndReset());
    } catch (err) {
      dispatch(showAlertFail(err));
    }
  }
}

export const initSuccess = (data) => {
  return {
    type: ACTION_TYPES.PRODUCT.INIT_SUCCESS,
    payload: data
  }
}