import {API, ACTION_TYPES} from '../constants'
import Axios from 'axios';
import {header} from '../helpers/headerHelper';
import {showAlertFail, showAlertAndReset} from './alertAction';

export const init = () => {
  return async (dispatch, getState) => {
    try {
      const {jwt} = getState().auth;
      const response = await Axios.post(API.PRODUCT.INIT, null, {headers: header(jwt)});
      dispatch(initSuccess(response.data));
    } catch (err) {
      dispatch(showAlertFail(err));
    }
  }
};
export const save = (form) => {
  return async (dispatch, getState) => {
    try {
      const {jwt} = getState().auth;
      await Axios.post(API.PRODUCT.SAVE, form, {headers: header(jwt)});
      dispatch(showAlertAndReset());
    } catch (err) {
      dispatch(showAlertFail(err));
    }
  }
};
export const initSuccess = (data) => {
  return {
    type: ACTION_TYPES.PRODUCT.INIT_SUCCESS,
    payload: data
  }
};
export const search = (condition) => (
  async (dispatch, getState) => {
    try {
      const {jwt} = getState().auth;
      const response = await Axios.post(API.PRODUCT.SEARCH, condition, {headers: header(jwt)});
      dispatch(searchSuccess(response.data));
    } catch (e) {
      dispatch(showAlertFail(e));
    }
  }
);
const searchSuccess = (data) => ({
  type: ACTION_TYPES.PRODUCT.SEARCH_SUCCESS,
  payload: data
});
export const searchPrice = (data) => (
  async (dispatch, getState) => {
    try {
      const {jwt} = getState().auth;
      const response = await Axios.post(API.PRODUCT.SEARCH_PRICE, data, {headers: header(jwt)});
      dispatch(searchPriceSuccess(response.data));
    } catch (e) {
      dispatch(showAlertFail(e));
    }
  }
);
const searchPriceSuccess = (data) => ({
  type: ACTION_TYPES.PRODUCT.SEARCH_PRICE_PRODUCT_SUCCESS,
  payload: data
});
export const searchProductOnStore = (data) => (
  async (dispatch, getState) => {
    const {branch, jwt} = await getState().auth;
    try {
      const requestData = {
        amount: data.amount,
        branch
      };
      const response = await Axios.post(API.PRODUCT.SEARCH_PRODUCT_ON_STORE, requestData, {headers: header(jwt)});
      dispatch(searchProductOnStoreSuccess(response.data));
    } catch (e) {
      dispatch(showAlertFail(e));
    }
  }
);
const searchProductOnStoreSuccess = (data) => ({
  type: ACTION_TYPES.PRODUCT.SEARCH_PRODUCT_ON_STORE_SUCCESS,
  payload: data
});
export const getProductById = (id) => (
  async (dispatch, getState) => {
    try {
      const {jwt} = getState().auth;
      const response = await Axios.post(API.PRODUCT.GET_PRODUCT_BY_ID, id, {headers: header(jwt)});
      dispatch(getProductByIdSuccess(response.data));
    } catch (e) {
      dispatch(showAlertFail(e));
    }
  }
);
const getProductByIdSuccess = (data) => ({
  type: ACTION_TYPES.PRODUCT.GET_PRODUCT_BY_ID_SUCCESS,
  payload: data
});
export const saveEdit = (data) => (
  async (dispatch, getState) => {
    try {
      const {jwt} = getState().auth;
      await Axios.post(API.PRODUCT.SAVE_EDIT, data, {headers: header(jwt)});
      dispatch(showAlertAndReset());
    } catch (e) {
      dispatch(showAlertFail(e));
    }
  }
);
export const setSpecUnit = (data) => ({
  type: ACTION_TYPES.PRODUCT.SET_SPEC_UNIT,
  payload: data
});
export const setUnit = (data) => ({
  type: ACTION_TYPES.PRODUCT.SET_UNIT,
  payload: data
});
export const saveListProduct = (data) => (
  async (dispatch, getState) => {
    try {
      const {jwt} = getState().auth;
      await Axios.post(API.PRODUCT.SAVE_LIST_PRODUCT, data, {headers: header(jwt)});
      dispatch(showAlertAndReset());
    } catch (e) {
      dispatch(showAlertFail(e));
    }
  }
)
