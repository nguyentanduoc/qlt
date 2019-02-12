import {ACTION_TYPES, API, LOCAL_STORAGE} from '../constants';
import axios from 'axios';

export const login = (auth) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(API.LOGIN, auth);
      dispatch(loginSuccess(res.data));
    }
    catch (err) {
      if(err && err.response && err.response.data && err.response.data.message) {
        dispatch(loginFail(err.response.data.message));
      } else {
        dispatch(loginFail(err.toString()));
      }
    }
  }
}
export  const loginSuccess = (data) => {
  sessionStorage.setItem(LOCAL_STORAGE.IS_LOGIN, true);
  sessionStorage.setItem(LOCAL_STORAGE.ACCESS_KEY, data.jwtAuthenticationResponse.accessToken);
  return {
    type: ACTION_TYPES.LOGIN_SUCCESS,
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
  sessionStorage.removeItem(LOCAL_STORAGE.IS_LOGIN);
  sessionStorage.removeItem(LOCAL_STORAGE.ACCESS_KEY);
  return {
    type: ACTION_TYPES.LOGOUT
  }
}