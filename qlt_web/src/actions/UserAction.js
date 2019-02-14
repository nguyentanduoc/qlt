import {ACTION_TYPES, API} from '../constants';
import axios from 'axios';
import { header } from '../helpers/headerHelper';

export const getAllUser = () => {
  let config = {
    headers: header()
  }
  return async (dispatch) => {
    try {
      const res = await axios.post(API.GET_ALL_USER, null ,config);
      dispatch(getAllUserSuccess(res.data));
    } catch (error) {
      dispatch(getAllUserFail(error.toString()));
    }
  }
}
export const updateUserRole = (user) => {
  let config = {
    headers: header()
  }
  return async (dispatch) => {
    try {
      const res = await axios.post(API.UPDATE_USER_ROLE, user, config);
      dispatch(updateUserSuccess(res.data));
    } catch (error) {
      dispatch(updateUserFail(error.toString()));
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
export const updateUserSuccess = (data) => {
  return {
    type: ACTION_TYPES.UPDATE_USER_SUCCESS,
    payload: data
  }
}
export const updateUserFail = (error) => {
  return {
    type: ACTION_TYPES.UPDATE_USER_FAIL,
    payload: error
  }
}
export const setSetCloseAlert = () => {
  return {
    type: ACTION_TYPES.SET_CLOSE_ALERT
  }
}