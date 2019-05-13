import Axios from "axios"
import headerConfig, {header} from '../helpers/headerHelper'
import {API, ACTION_TYPES} from "../constants"
import {showAlertFail, showAlertAndReset} from "./alertAction";

export const init = () => {
  return async (dispatch, getState) => {
    try {
      const {jwt} = getState().auth;
      const response = await Axios.post(API.IMPORT.INIT, null, {headers: header(jwt)});
      dispatch(initSuccess(response.data));
    } catch (err) {
      dispatch(showAlertFail(err));
    }
  }
};
export const initSuccess = (data) => {
  return {
    type: ACTION_TYPES.IMPORT.INIT,
    payload: data
  }
};

export const getSpecUnit = (productId) => {
  return async (dispatch, getState) => {
    try {
      const  {jwt} = getState().auth;
      const response = await Axios.post(API.PRODUCT.GET_SPEC_UNIT, productId, {headers:header(jwt)});
      dispatch(setSpecUnitSelection(response.data));
    } catch(err) {
      dispatch(showAlertFail(err));
    }
  }
};
export const setSpecUnitSelection = (data) => {
  return {
    type: ACTION_TYPES.IMPORT.SET_SPEC_SELECTION,
    payload: data
  }
};
export const setSpecUnitSelectionWithoutProduct = (data) => {
  return {
    type: ACTION_TYPES.IMPORT.SET_SPEC_SELECTION_WITHOUT_PRODUCT,
    payload: data
  }
};
export const save = (data, branch) => {
  return async (dispatch, getState) => {
    try {
      const {jwt} =  getState().auth;
      const response = await Axios.post(API.IMPORT.SAVE, {data, branch}, {headers: header(jwt)});
      if (response.status === 200) {
        dispatch(saveSuccess());
        dispatch(showAlertAndReset());
      } else {
        dispatch(showAlertFail(response));
      }
    } catch (err) {
      dispatch(showAlertFail(err));
    }
  }
};
export const saveSuccess = () => {
  return {
    type: ACTION_TYPES.IMPORT.SAVE_SUCCESS
  }
};
export const resetSaveSuccess = () => {
  return {
    type: ACTION_TYPES.IMPORT.RESET_SAVE_SUCCESS
  }
};
export const search = (condition) => (
  async (dispatch, getState) => {
    try {
      const {jwt} = getState().auth;
      const response = await Axios.post(API.IMPORT.SEARCH, condition, {headers: header(jwt)});
      dispatch(searchSuccess(response.data));
    } catch (e) {
      dispatch(showAlertFail(e));
    }
  }
);
const searchSuccess = (data) => ({
  type: ACTION_TYPES.IMPORT.SEARCH_SUCCESS,
  payload: data
});
export const getDetail = (id) => (
  async (dispatch, getState) => {
    try {
      const {jwt}= getState().auth;
      const response = await Axios.post(API.IMPORT.GET_DETAIL, id, {headers: header(jwt)});
      dispatch(getDetailSuccess(response.data));
    } catch (e) {
      dispatch(showAlertFail(e));
    }
  }
);
const getDetailSuccess = (data) => ({
  type: ACTION_TYPES.IMPORT.GET_DETAIL_SUCCESS,
  payload: data
});
