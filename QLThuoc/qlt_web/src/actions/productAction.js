import {API, ACTION_TYPES} from '../constants'
import Axios from 'axios';
import header from '../helpers/headerHelper';
import {showAlertFail, showAlertAndReset} from './alertAction';

export const init = () => {
  return async (dispatch) => {
    try {
      const response = await Axios.post(API.PRODUCT.INIT, null, header);
      dispatch(initSuccess(response.data));
    } catch (err) {
      dispatch(showAlertFail(err));
    }
  }
};
export const save = (form) => {
  return async (dispatch) => {
    try {
      await Axios.post(API.PRODUCT.SAVE, form, header);
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
  async dispatch => {
    try {
      const response = await Axios.post(API.PRODUCT.SEARCH, condition, header);
      dispatch(searchSuccess(response.data));
    } catch (e) {
      dispatch(showAlertFail(e));
    }
  }
);
const searchSuccess = (data) => ({
  type: ACTION_TYPES.PRODUCT.SEARCH_SUCCESS,
  payload: data
})
export const searchPrice = (data) => (
  async dispatch => {
    try {
      const response = await Axios.post(API.PRODUCT.SEARCH_PRICE, data, header);
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
    const {auth} = await getState();
    const {branch} = await auth;
    try {
      const requestData = {
        amount: data.amount,
        branch
      };
      const response = await Axios.post(API.PRODUCT.SEARCH_PRODUCT_ON_STORE, requestData, header);
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
  async dispatch => {
    try {
      const response = await Axios.post(API.PRODUCT.GET_PRODUCT_BY_ID, id, header);
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
  async dispatch => {
    try {
      await Axios.post(API.PRODUCT.SAVE_EDIT, data, header);
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

