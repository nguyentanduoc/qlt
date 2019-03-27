import { ACTION_TYPES, API, LOCAL_STORAGE } from '../constants';
import {showAlertFail} from './alertAction.js'
import headerConfig from '../helpers/headerHelper'
import axios from 'axios';

export const login = (auth) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(API.LOGIN, auth);
      dispatch(loginSuccess(res.data));
    }
    catch (err) {
      dispatch(setLoading());
      if (err && err.response && err.response.data && err.response.data.message) {
        dispatch(loginFail(err.response.data.message));
      } else {
        dispatch(loginFail(err.toString()));
      }
    } 
  }
}
export const loginSuccess = (data) => {
  sessionStorage.setItem(LOCAL_STORAGE.IS_LOGIN, true);
  sessionStorage.setItem(LOCAL_STORAGE.ACCESS_KEY, data.jwtAuthenticationResponse.accessToken);
  return {
    type: ACTION_TYPES.AUTH.LOGIN_SUCCESS,
    payload: data
  }
}

export const loginFail = (err) => {
  return {
    type: ACTION_TYPES.HAS_ERROR,
    payload: err
  }
}

export const logout = () => {
  return async (dispatch) => {
    try{
      const res = await axios.post(API.LOGOUT, null, headerConfig);
      if(res.status === 200){
        await sessionStorage.removeItem(LOCAL_STORAGE.IS_LOGIN);
        await sessionStorage.removeItem(LOCAL_STORAGE.ACCESS_KEY);
      }
      return dispatch(logoutSuccess());
    } catch (err) {
      return dispatch(showAlertFail("Thoát thất bại"));
    }
  }
  
}
export const logoutSuccess = () => {
  return {
    type: ACTION_TYPES.AUTH.LOGOUT
  }
}
export const setBranch = (branch) => {
  return {
    type: ACTION_TYPES.AUTH.SET_BRANCH,
    payload: branch
  }
}
export const setLoading = () => {
  return {
    type:ACTION_TYPES.AUTH.SET_LOADING
  }
}
