import {ACTION_TYPES, API, LOCAL_STORAGE, BEARSER} from '../core/constants';
import axios from 'axios';

export const login = (auth) => {
  return (dispatch) => {
    try {
      const res = axios.post(API.LOGIN, auth);
      dispatch(loginSuccess(res.data));
    }
    catch (err) {
      dispatch(loginFail(err));
    }
  }
}
export  const loginSuccess = (data) => {
  localStorage.setItem(LOCAL_STORAGE.IS_LOGIN, true);
  localStorage.setItem(LOCAL_STORAGE.ACCESS_KEY, data.accessToken);
  return {
    type: ACTION_TYPES.LOGIN_SUCCESS,
    payload: data
  }
}

export const loginFail = (err) => {
  return {
    type: ACTION_TYPES.LOGIN_HAS_ERRORED,
    payload: err
  }
}
export const getAllUserSuccess = (data) => {
  return {
    type: ACTION_TYPES.GET_ALL_USER_SUCCESS,
    payload: data
  }
}

export const getAllUserFail = (err) => {
  return {
    type: ACTION_TYPES.GET_ALL_USER_HAS_ERRORED,
    payload: err
  }
}
