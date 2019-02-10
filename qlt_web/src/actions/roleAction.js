import {ACTION_TYPES, API, LOCAL_STORAGE, BEARSER} from '../constants';
import axios from 'axios';

export const getAllRole = () => {
  const token = localStorage.getItem(LOCAL_STORAGE.ACCESS_KEY);
  let config = {
    headers: { 
      'Authorization': `${BEARSER}${token}`,
      'Content-Type': 'application/json' }
  };
  return async (dispatch) => {
    try {
      const res = await axios.post(API.GET_ALL_ROLE, null ,config);
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