import {ACTION_TYPES, API} from '../constants';
import axios from 'axios';
import headerHelper from "../helpers/headerHelper";
import {showAlertFail} from './alertAction';

export const login = (auth) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(API.LOGIN, auth);
      dispatch(loginSuccess(res.data));
    } catch (err) {
      if (err && err.response && err.response.data && err.response.data.message) {
        dispatch(showAlertFail(err.response.data.message));
      } else {
        dispatch(showAlertFail(err.toString()));
      }
    }
  }
};
export const loginSuccess = (data) => {
  return {
    type: ACTION_TYPES.AUTH.LOGIN_SUCCESS,
    payload: data
  }
};
export const logout = () => {
  return async (dispatch) => {
    try {
      await axios.post(API.LOGOUT, null, headerHelper);
      dispatch(logoutSuccess());
    } catch (err) {
      dispatch(logoutSuccess());
    }
  }
};
export const logoutSuccess = () => {
  return {
    type: ACTION_TYPES.AUTH.LOGOUT
  }
};
export const setBranch = (branch) => {
  return {
    type: ACTION_TYPES.AUTH.SET_BRANCH,
    payload: branch
  }
};
export const setLoading = () => {
  return {
    type: ACTION_TYPES.AUTH.SET_LOADING
  }
};
export const cleanAll = () => ({
  type: ACTION_TYPES.AUTH.CLEAR_ALL,
})
