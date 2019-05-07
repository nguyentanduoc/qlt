import Axios from "axios";
import {ACTION_TYPES, API} from "../constants";
import headerHelper from "../helpers/headerHelper";
import {showAlertAndReset, showAlertFail, showAlertSuccess} from "./alertAction";
import {setSpecUnitSelectionWithoutProduct} from "./importProductAction";

export const init = () => {
  return async (dispatch) => {
    try {
      const response = await Axios.post(API.SPEC_UNIT_PRODUCT.INIT, null, headerHelper);
      return dispatch(initSuccess(response.data));
    } catch (e) {
      return dispatch(showAlertFail(e));
    }
  }
};

const initSuccess = (data) => ({
  type: ACTION_TYPES.SPEC_UNIT.INIT_SUCCESS,
  payload: data
});

export const save = (data) => {
  return async (dispatch) => {
    try {
      const response = await Axios.post(API.SPEC_UNIT_PRODUCT.SAVE, data, headerHelper);
      dispatch(showAlertSuccess());
      dispatch(setSpecUnitSelectionWithoutProduct(response.data));
    } catch (e) {
      return dispatch(showAlertFail(e));
    }
  }
};
export const saveSuccess = (data) => {
  return {
    type: ACTION_TYPES.SPEC_UNIT.SAVE_SUCCESS,
    payload: data
  }
};
export const getAllSuccess = (data) => {
  return {
    type: ACTION_TYPES.SPEC_LEVEL_BRANCH.GET_ALL_SUCCESS,
    payload: data
  }
};
export const getAllUnit = () => (
  async dispatch => {
    try {
      const response = await Axios.post(API.SPEC_UNIT_PRODUCT.GET_ALL_UNIT, null, headerHelper);
      dispatch(getAllUnitSuccess(response.data));
    } catch (e) {
      dispatch(showAlertFail(e));
    }
  }
);
const getAllUnitSuccess = (data) => ({
  type: ACTION_TYPES.SPEC_UNIT.GET_ALL_UNIT_SUCCESS,
  payload: data
});
export const saveUnit = (data) => (
  async (dispatch) => {
    try {
      const response = await Axios.post(API.SPEC_UNIT_PRODUCT.SAVE_UNIT, data, headerHelper);
      dispatch(saveUnitSuccess(response.data));
      dispatch(showAlertAndReset());
    } catch (e) {
      dispatch(showAlertFail(e))
    }
  }
);
const saveUnitSuccess = (data) => ({
  type: ACTION_TYPES.SPEC_UNIT.SAVE_UNIT_SUCCESS,
  payload: data
})
