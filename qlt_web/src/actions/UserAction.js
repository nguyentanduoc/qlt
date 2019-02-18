import {ACTION_TYPES, API} from '../constants'
import axios from 'axios'
import config, {headerForGet} from '../helpers/headerHelper'
import {showAlertSuccess, showAlertFail} from './alertAction'
import { setPagination } from '../actions/paginationAction'
import { pageRequestDefault } from '../helpers/pageable'

export const getAllUser = () => {
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
  return async (dispatch) => {
    try {
      const res = await axios.post(API.UPDATE_USER_ROLE, user, config);
      dispatch(updateUserSuccess(res.data));
    } catch (error) {
      dispatch(updateUserFail(error.toString()));
    }
  }
}

export const createAccount = (account) => {
  return async (dispatch) => {
    try {
      await axios.post(API.USER.CREATE_ACCOUNT, account ,config);
      await dispatch(showAlertSuccess());
      await dispatch(getUserLimit());
    } catch (error) {
      console.log(error);
      dispatch(showAlertFail(error));
    }
  }
}

export const getUserLimit = (page) => {

  return async (dispatch) => {
    try {
      let res;
      if(page){
        res = await axios.get(API.USER.GET_USER_LIMIT, headerForGet(page));
        console.log("get user done");
      } else {
        res = await axios.get(API.USER.GET_USER_LIMIT, headerForGet(pageRequestDefault()));
      }
      await dispatch(setPagination(res.data));
      await dispatch(getUsersSuccess(res.data.content));

    } catch(error) {
      dispatch(showAlertFail(error));
    }
  }
}
export const searchUser = (codition) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(API.USER.SEARCH_USER, codition.txtCondition ,config);
      dispatch(getUsersSuccess(res.data.content));
    } catch (error) {
      dispatch(getFail(error));
    }
  }
}
export const deleteUser = (users) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(API.USER.DELETE_USER, users ,config);
      await dispatch(showAlertSuccess());
    } catch(error) {
      dispatch(getFail(error));
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
export const getUsersSuccess = (data) => {
  return {
    type: ACTION_TYPES.USER.GET_USERS_SUCCESS,
    payload: data
  }
}
export const getFail = (error) => {
  return {
    type: ACTION_TYPES.HAS_ERROR,
    payload: error
  }
}
export const setUserForDetail = (user) => {
  return {
    type: ACTION_TYPES.USER.SET_USER_DETAIL,
    payload: user
  }
}
export const resetUserFordetail = () => {
  return {
    type: ACTION_TYPES.USER.RESET_USER_DETAIL
  }
}