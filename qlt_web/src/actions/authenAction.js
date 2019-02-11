import {ACTION_TYPES, API, LOCAL_STORAGE} from '../constants';
import axios from 'axios';

export const login = (auth) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(API.LOGIN, auth);
      dispatch(loginSuccess(res.data));
    }
    catch (err) {
      dispatch(loginFail(err.toString()));
    }
  }
}
export  const loginSuccess = (data) => {
  localStorage.setItem(LOCAL_STORAGE.IS_LOGIN, true);
  localStorage.setItem(LOCAL_STORAGE.ACCESS_KEY, data.jwtAuthenticationResponse.accessToken);
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
