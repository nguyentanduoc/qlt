import Axios from "axios";
import {ACTION_TYPES, API} from "../constants";
import {header} from "../helpers/headerHelper";
import {showAlertFail, showAlertAndReset} from "./alertAction";

export const save = (data) => {
  return async (dispatch, getState) => {
    try {
      const {jwt} = getState().auth;
      const response = await Axios.post(API.SPEC_LEVEL_BRANCH.SAVE, data, {headers: header(jwt)});
      dispatch(showAlertAndReset());
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
export const getAll = () => {
  return async (dispatch, getState) => {
    try {
      const {jwt} = getState().auth;
      const response = await Axios.post(API.SPEC_LEVEL_BRANCH.GET_ALL, null, {headers: header(jwt)});
      return dispatch(getAllSuccess(response.data));
    } catch (e) {
      return dispatch(showAlertFail(e));
    }
  }
};
export const getAllSuccess = (data) => {
  return {
    type: ACTION_TYPES.SPEC_LEVEL_BRANCH.GET_ALL_SUCCESS,
    payload: data
  }
};
export const deleteSpecLevelBranch = (id) => (
  async (dispatch, getState) => {
    try {
      const {jwt} = getState().auth;
      await Axios.post(API.SPEC_LEVEL_BRANCH.DELETE_SPEC_LEVEL_BRANCH, id,{headers: header(jwt)});
      dispatch(deleteSuccess(id))
    } catch (e) {
      return dispatch(showAlertFail(e));
    }
  }
);
const deleteSuccess = (id) => ({
  type: ACTION_TYPES.SPEC_LEVEL_BRANCH.DELETE_SUCCESS,
  payload: id
})
