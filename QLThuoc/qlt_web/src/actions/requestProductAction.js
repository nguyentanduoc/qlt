import {ACTION_TYPES, API} from '../constants';
import Axios from 'axios';
import {header} from '../helpers/headerHelper'
import {showAlertFail, showAlertSuccess} from './alertAction.js'

export const getAllProduct = (branch) => {
  return async (dispatch, getState) => {
    try {
      const {jwt} = getState().auth;
      const request = await Axios.post(API.PRODUCT.GET_PRODUCT_FOR_REQUEST, branch, {headers: header(jwt)});
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
};

export const getUnit = (productId) => {
  return async (dispatch, getState) => {
    try {
      const {jwt} = getState().auth;
      const response = await Axios.post(API.PRODUCT.GET_UNIT_OF_PRODUCT, productId, {headers: header(jwt)});
      dispatch(setUnitSelection(response.data));
    } catch (err) {
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
  return async (dispatch, getState) => {
    try {
      const {jwt} = getState().auth;
      const response = await Axios.post(API.PRODUCT.GET_AMOUNT_PRODUCT, {id, branchId}, {headers: header(jwt)});
      dispatch(getAmountProductSuccess(response.data));
    } catch (err) {
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

export const save = (data, branch, noteRequest) => {
  return async (dispatch, getState) => {
    try {
      const {jwt} = getState().auth;
      await Axios.post(API.REQUEST.SAVE, {data, branch, noteRequest}, {headers: header(jwt)});
      dispatch(showAlertSuccess());
      dispatch(saveSuccess());
    } catch (err) {
      dispatch(showAlertFail(err));
    }
  }
}

export const saveSuccess = () => {
  return {
    type: ACTION_TYPES.REQUEST.SAVE_SUCCESS
  }
}

export const resetSaveSuccess = () => {
  return {
    type: ACTION_TYPES.REQUEST.RESET_SAVE_SUCCESS
  }
}

export const search = (condition) => (
  async (dispatch, getState) => {
    try {
      const {jwt} = getState().auth;
      const response = await Axios.post(API.REQUEST.SEARCH, condition, {headers: header(jwt)});
      dispatch(searchSuccess(response.data));
    } catch (e) {
      dispatch(showAlertFail(e));
    }
  }
)
const searchSuccess = (data) => ({
  type: ACTION_TYPES.REQUEST.SEARCH_SUCCESS,
  payload: data
})
export const requestProductSearch = (data) => (
  async (dispatch, getState) => {
    const {jwt, branch} = getState().auth;
    try {
      data.branchDto = branch;
      const response = await Axios.post(API.REQUEST.SEARCH_REQUEST_PRODUCT, data, {headers: header(jwt)});
      console.log(response);
      dispatch(searchSuccess(response.data));
    } catch (e) {
      dispatch(showAlertFail(e));
    }
  }
);
export const requestProductGetDetail = (id) => (
  async (dispatch, getState) => {
    try {
      const {jwt} = getState().auth;
      const response = await Axios.post(API.REQUEST.GET_DETAIL, id, {headers: header(jwt)});
      dispatch(getDetailSuccess(response.data));
    } catch (e) {
      dispatch(showAlertFail(e));
    }
  }
);
const getDetailSuccess = (data) => ({
  type: ACTION_TYPES.REQUEST.GET_DETAIL_SUCCESS,
  payload: data
});
export const getAllWaitingAccept = () => (
  async (dispatch, getState) => {
    try {
      const {jwt, branch} = getState().auth;
      const response = await Axios.post(API.REQUEST.SEARCH_WAITING_REQUEST, branch, {headers: header(jwt)});
      dispatch(searchSuccess(response.data));
    } catch (e) {
      dispatch(showAlertFail(e));
    }
  }
)
