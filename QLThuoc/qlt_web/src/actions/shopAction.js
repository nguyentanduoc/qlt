import {ACTION_TYPES, API} from '../constants'
import axios from 'axios'
import {header, headerForGet} from '../helpers/headerHelper'
import {showAlertAndReset, showAlertFail} from './alertAction.js'
import {setPagination} from '../actions/paginationAction'
import {pageRequestDefault} from '../helpers/pageable'

export const save = (shop) => {
  return async (dispatch, getState) => {
    try {
      const {jwt} = getState().auth;
      let response = await axios.post(API.SHOP.SAVE, shop ,{headers: header(jwt)});
      dispatch(saveSuccess(response.data));
      dispatch(showAlertAndReset());
    } catch(err) {
      dispatch(showAlertFail(err));
    }
  }
}

export const select = (condition) => {
  return async (dispatch, getState) => {
    try {
      const {jwt} = getState().auth;
      let params = {...pageRequestDefault()};
      params.condition = condition;
      const res = await axios.get(API.SHOP.SELECT, headerForGet(params, jwt));
      dispatch(setPagination(res.data));
      dispatch(selectSuccess(res.data.content));
    }
    catch (err) {
      dispatch(showAlertFail(err));
    }
  }
}
export const selectSuccess = (data) => ({
  type: ACTION_TYPES.SHOP.GET_SUCCESS,
  payload: data
})
export const setDetail = (row) => ({
  type: ACTION_TYPES.SHOP.SET_DETAIL,
  payload: row
})
export const reset = () => ({
  type: ACTION_TYPES.SHOP.RESET
})
export const resetFlgDetail = () => ({
  type: ACTION_TYPES.SHOP.RESET_FLG_DETAIL
})
export const deleteShop = (keys) => {
  return async (dispatch, getState) =>  {
    try {
      const {jwt} = getState().auth;
      await axios.post(API.SHOP.DELETE, keys ,{headers: header(jwt)});
      dispatch(showAlertAndReset());
      dispatch(deleteSuccess(keys));
    } catch(err) {
      dispatch(showAlertFail(err));
    }
  }
}
export const deleteSuccess = (keys) => ({
  type: ACTION_TYPES.SHOP.DELETE_SUCCESS,
  payload: keys
})
export const saveSuccess = (data) => ({
  type:ACTION_TYPES.SHOP.SAVE_SUCCESS,
  payload: data
})
export const resetSaveSuccess = () => ({
  type:ACTION_TYPES.SHOP.RESET_SAVE_SUCCESS
})
