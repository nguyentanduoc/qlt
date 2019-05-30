import {NAV_ACTION_TYPE, NAV_API, ACTION_TYPES} from '../constants';
import axios from 'axios';
import {header} from '../helpers/headerHelper';
import {showAlertFail, showAlertAndReset} from '../actions/alertAction';

export const getAllNav = () => {
  return async (dispatch, getState) => {
    try {
      const {jwt} = getState().auth;
      const res = await axios.post(NAV_API.GET_ALL_NAV, null, {headers: header(jwt)});
      dispatch(getAllNavSuccess(res.data));
    } catch (err) {
      if (err && err.response && err.response.data && err.response.data.message) {
        dispatch(getAllNavFail(err.response.data.message));
      } else {
        dispatch(getAllNavFail(err.toString()));
      }
    }
  }
};
export const getAllSubNav = (id) => {
  return async (dispatch, getState) => {
    try {
      const {jwt} = getState().auth;
      const res = await axios.post(NAV_API.GET_ALL_SUB_NAV, id, {headers: header(jwt)});
      dispatch(getAllSubNavSuccess(res.data));
    } catch (err) {
      if (err && err.response && err.response.data && err.response.data.message) {
        dispatch(getAllNavFail(err.response.data.message));
      } else {
        dispatch(getAllNavFail(err.toString()));
      }
    }
  }
};

export const updateNav = (nav) => {
  return async (dispatch, getState) => {
    try {
      const {jwt} = getState().auth;
      const res = await axios.post(NAV_API.UPDATE_NAV, nav, {headers: header(jwt)});
      dispatch(showAlertAndReset("Cập nhật thành công"));
      dispatch(updateSuccess(res.data));
    } catch (err) {
      if (err && err.response && err.response.data && err.response.data.message) {
        dispatch(showAlertFail(err.response.data.message));
        dispatch(updateNavFail(err.response.data.message));
      } else {
        dispatch(showAlertFail(err.toString()));
        dispatch(updateNavFail(err.toString()));
      }
    }
  }
}

export const setNav = (nav) => {
  return {
    type: NAV_ACTION_TYPE.SET_NAV,
    payload: nav
  }
}

export const setRoleForNav = (roles) => {
  return {
    type: NAV_ACTION_TYPE.SET_ROLE_FOR_NAV,
    payload: roles
  }
}

export const getAllNavSuccess = (data) => {
  return {
    type: NAV_ACTION_TYPE.GET_ALL_NAV_SUCCESS,
    payload: data
  }
}

export const getAllNavFail = (err) => {
  return {
    type: ACTION_TYPES.HAS_ERROR,
    payload: err
  }
}

export const getAllSubNavSuccess = (data) => {
  return {
    type: NAV_ACTION_TYPE.GET_ALL_SUB_NAV,
    payload: data
  }
}
export const updateSuccess = (data) => {
  return {
    type: NAV_ACTION_TYPE.UPDATE_SUCCESS,
    payload: data
  }
}

export const updateNavFail = (err) => {
  return {
    type: ACTION_TYPES.HAS_ERROR,
    payload: err
  }
}
export const resetAllNav = () => {
  return {
    type: NAV_ACTION_TYPE.RESET_ALL
  }
}
