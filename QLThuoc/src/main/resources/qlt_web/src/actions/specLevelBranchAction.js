import Axios from "axios";
import {ACTION_TYPES, API} from "../constants";
import headerHelper from "../helpers/headerHelper";
import {showAlertFail} from "./alertAction";

export const save = (data) => {
  return async (dispatch) => {
    try{
      const response = await Axios.post(API.SPEC_LEVEL_BRANCH.SAVE, data, headerHelper);
      console.log(response);
      return dispatch(saveSuccess(response.data));
    }catch (e) {
    return dispatch(showAlertFail(e));
    }
  }
};
export const saveSuccess = (data) => {
  return {
    type: ACTION_TYPES.SPEC_LEVEL_BRANCH.SAVE_SUCCESS,
    payload: data
  }
}
export const getAll = () => {
  return async (dispatch) => {
    try {
      const response = await Axios.post(API.SPEC_LEVEL_BRANCH.GET_ALL, null, headerHelper);
      return dispatch(getAllSuccess(response.data));
    } catch (e) {
      return dispatch(showAlertFail(e));
    }
  }
}
export const getAllSuccess = (data) => {
  return {
    type: ACTION_TYPES.SPEC_LEVEL_BRANCH.GET_ALL_SUCCESS,
    payload: data
  }
}
