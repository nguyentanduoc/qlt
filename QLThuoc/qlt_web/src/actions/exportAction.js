import {ACTION_TYPES, API} from "../constants";
import {showAlertAndReset, showAlertFail} from "./alertAction";
import Axios from "axios";
import {header} from "../helpers/headerHelper";

export const getAllProduct = (branch) => {
  return async (dispatch, getState) => {
    try {
      const {jwt} = getState().auth;
      const response = await Axios.post(API.PRODUCT.GET_ALL_PRODUCT_BY_BRANCH, branch, {headers: header(jwt)});
      return dispatch(getProductSuccess(response.data));
    } catch (e) {
      return dispatch(showAlertFail(e));
    }
  }
};
export const getProductSuccess = (data) => ({
  type: ACTION_TYPES.EXPORT.GET_PRODUCT_SUCCESS,
  payload: data
});
export const getSpecUnit = (productId, branchId) => {
  return async (dispatch, getState) => {
    try {
      const {jwt} = getState().auth;
      const response = await Axios.post(API.EXPORT.GET_SPEC_UNIT_AND_PRICE_AND_QUANLITY_IN_STORE, {
        productId,
        branchId
      }, {headers: header(jwt)});
      dispatch(getSpecSuccess(response.data));
    } catch (e) {
      return dispatch(showAlertFail(e));
    }
  }
};
export const getSpecSuccess = (data) => {
  return {
    type: ACTION_TYPES.EXPORT.GET_SPEC_UNIT_SUCCESS,
    payload: data
  }
};
export const setListDetail = (data) => {
  return {
    type: ACTION_TYPES.EXPORT.SET_DETAIL_BILL,
    payload: data
  }
};
export const save = (data) => {
  return async (dispatch, getState) => {
    try {
      const {jwt} = getState().auth;
      const response = await Axios.post(API.EXPORT.SAVE, data, {headers: header(jwt)});
      if (response.status === 200) {
        dispatch(clearDetail());
        return dispatch(showAlertAndReset());
      } else {
        return dispatch(showAlertFail("Lưu thất bại"));
      }
    } catch (e) {
      return dispatch(showAlertFail(e));
    }
  }
};
export const getInventory = (data) => {
  return async (dispatch, getState) => {
    try {
      const {jwt} = getState().auth;
      const response = await Axios.post(API.EXPORT.GET_INVENTORY, data, {headers: header(jwt)});
      return dispatch(getInventorySuccess(response.data));
    } catch (e) {
      return dispatch(showAlertFail(e));
    }
  }
};
export const getInventorySuccess = (data) => ({
  type: ACTION_TYPES.EXPORT.GET_INVENTORY,
  payload: data
});
export const deleteExport = (record) => ({
  type: ACTION_TYPES.EXPORT.DELETE,
  payload: record
});
export const setIsPrint = () => ({
  type: ACTION_TYPES.EXPORT.SET_IS_PRINT
});
export const clearDetail = () => ({
  type: ACTION_TYPES.EXPORT.CLEAR_DETAIL
});
export const search = (data) => {
  return async (dispatch,getState) => {
    try {
      const {jwt} = getState().auth;
      const response = await Axios.post(API.EXPORT.SEARCH, data, {headers: header(jwt)});
      dispatch(searchSuccess(response.data));
    } catch (e) {
      dispatch(showAlertFail(e));
    }
  }
};
export const getDetail = (data) => {
  return async (dispatch, getState) => {
    try {
      const {jwt} = getState().auth;
      const response = await Axios.post(API.EXPORT.GET_DETAIL, data, {headers: header(jwt)});
      dispatch(getDetailSuccess(response.data));
    } catch (e) {
      dispatch(showAlertFail(e));
    }
  }
};
const searchSuccess = (data) => ({
  type: ACTION_TYPES.EXPORT.SEARCH_SUCCESS,
  payload: data
});
const getDetailSuccess = (data) => ({
  type: ACTION_TYPES.EXPORT.GET_DETAIL_SUCCESS,
  payload: data
});
