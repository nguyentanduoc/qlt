import {ACTION_TYPES, API} from "../constants";
import {showAlertAndReset, showAlertFail} from "./alertAction";
import Axios from "axios";
import headerHelper from "../helpers/headerHelper";

export const getAllProduct = (branch) => {
  return async (dispatch) => {
    try {
      const response = await Axios.post(API.PRODUCT.GET_ALL_PRODUCT_BY_BRANCH, branch, headerHelper);
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
  return async (dispatch) => {
    try {
      const response = await Axios.post(API.EXPORT.GET_SPEC_UNIT_AND_PRICE_AND_QUANLITY_IN_STORE, {
        productId,
        branchId
      }, headerHelper);
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
}
export const save = (data) => {
  return async (dispatch) => {
    try {
      const response =  await Axios.post(API.EXPORT.SAVE, data, headerHelper);
      if(response.status === 200){
        return dispatch(showAlertAndReset());
      } else {
        return dispatch(showAlertFail("Lưu thất bại"));
      }
    } catch (e) {
      return dispatch(showAlertFail(e));
    }
  }
}
