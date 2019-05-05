import Axios from "axios";
import {ACTION_TYPES, API} from "../constants";
import headerHelper from "../helpers/headerHelper";
import {showAlertFail, showAlertSuccess} from "./alertAction";

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
      return dispatch(saveSuccess(response.data));
    } catch (e) {
      return dispatch(showAlertFail(e));
    }
  }
};
export const saveSuccess = (data) => {
  return {
    type: ACTION_TYPES.SPEC_LEVEL_BRANCH.SAVE_SUCCESS,
    payload: data
  }
};
export const getAllSuccess = (data) => {
  return {
    type: ACTION_TYPES.SPEC_LEVEL_BRANCH.GET_ALL_SUCCESS,
    payload: data
  }
};
