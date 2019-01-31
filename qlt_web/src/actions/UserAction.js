import {ACTION_TYPES, API, LOCAL_STORAGE, BEARSER} from '../constants';
import axios from 'axios';


export const getAllUser = () => {
  const token = localStorage.getItem(LOCAL_STORAGE.ACCESS_KEY);
  let config = {
    headers: { 
      'Authorization': `${BEARSER}${token}`,
      'Content-Type': 'application/json' }
  };
  return async (dispatch) => {
    try {
      const res = await axios.post(API.GET_ALL_USER, null ,config);
      dispatch(getAllUserSuccess(res.data));
    } catch (error) {
      dispatch(getAllUserFail(error.toString()));
    }
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

export const showUser = (user) => {
  return {
    type: ACTION_TYPES.SHOW_USER,
    payload: user
  }
}
