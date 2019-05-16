import {ACTION_TYPES, API} from '../constants';
import axios from 'axios';
import {header} from '../helpers/headerHelper';

export const getAllRole = () => {
  return async (dispatch, getState) => {
    try {
      const {jwt} = getState().auth;
      const res = await axios.post(API.ROLE.GET_ALL_ROLE, null ,{headers: header(jwt)});
      dispatch(getAllRoleSuccess(res.data));
    } catch (error) {
      dispatch(getAllRoleFail(error));
    }
  }
};
export const getRoleForAdmin  = () => {
  return async (dispatch,getState) => {
    try {
      const {jwt} = getState().auth;
      const res = await axios.post(API.ROLE.GET_ROLE_FOR_ADMIN, null ,{headers: header(jwt)});
      dispatch(getAllRoleSuccess(res.data));
    } catch (error) {
      dispatch(getAllRoleFail(error));
    }
  }
}

export const getAllRoleSuccess = (data) => {
  return {
    type: ACTION_TYPES.GET_ALL_ROLE_SUCCESS,
    payload: data
  }
}

export const getRolesByRoles = (roles) => {
  return async (dispatch, getState) => {
    try {
      const {jwt} = getState().auth;
      const res = await axios.post(API.ROLE.GET_ROLES_BY_ROLES, roles ,{headers: header(jwt)});
      dispatch(getAllRoleSuccess(res.data));
    } catch (error) {
      dispatch(getAllRoleFail(error));
    }
  }
}
export const getAllRoleFail = (err) => {
  return {
    type: ACTION_TYPES.GET_ALL_ROLE_FAIL,
    payload: err
  }
}

export const openDetailRolesOfUser = (user) =>{
  return {
    type: ACTION_TYPES.OPEN_LIST_ROLE_OF_USER,
    payload: user
  }
}

export const setRoleUser = (user) => {
  return {
    type: ACTION_TYPES.SET_ROLE_USER,
    payload: user
  }
}

export const removeUserRoleDetail = () => {
  return {
    type: ACTION_TYPES.REMOVE_USER_DETAIL_FOR_ROLE
  }
}
