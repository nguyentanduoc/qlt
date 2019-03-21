
import { API, ACTION_TYPES } from '../constants';
import Axios from 'axios';
import headerConfig from '../helpers/headerHelper'
import {showAlertFail} from './alertAction.js'

export const getAllProduct = (branch) => {
  return async (dispatch) => {
    try {
      const request = await Axios.post(API.PRODUCT.GET_PRODUCT_FOR_REQUEST, branch, headerConfig);
      return dispatch(getProductSucces(request.data));
    } catch (err) {
      return dispatch(showAlertFail(err))
    }
  }
}

export const getProductSucces = (data) => {
  return {
    type: ACTION_TYPES.REQUEST.SET_PRODUCT,
    payload: data
  }
}

export const getUnit = (productId) => {
  return async (dispatch) => {
    try {
      const response = await Axios.post(API.PRODUCT.GET_UNIT_OF_PRODUCT, productId, headerConfig);
      dispatch(setUnitSelection(response.data));
    } catch(err) {
      dispatch(showAlertFail(err));
    }
  }
}
export const setUnitSelection = (data) => {
  return {
    type: ACTION_TYPES.REQUEST.SET_UNIT,
    payload: data
  }
}
export const getAmountProduct = (id, branchId) => {
  return async (dispatch) => {
    try {
      const response = await Axios.post(API.PRODUCT.GET_AMOUNT_PRODUCT, {id, branchId}, headerConfig);
      dispatch(getAmountProductSuccess(response.data));
    } catch(err) {
      dispatch(showAlertFail(err));
    }
  }
}
export const getAmountProductSuccess = (data) => {
  return {
    type: ACTION_TYPES.REQUEST.GET_AMOUNT_PRODUCT_SUCCESS,
    payload: data
  }
}