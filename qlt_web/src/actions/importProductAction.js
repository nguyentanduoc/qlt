import Axios from "axios"
import headerConfig from '../helpers/headerHelper'
import { API, ACTION_TYPES } from "../constants"
import { showAlertFail, showAlertAndReset } from "./alertAction";

export const init = () => {
  return async (dispatch) => {
    try {
      const response = await Axios.post(API.IMPORT.INIT,null ,headerConfig);
      dispatch(initSuccess(response.data));
    } catch (err) {
      dispatch(showAlertFail(err));
    }
  }
}
export const initSuccess = (data) => {
  return {
    type: ACTION_TYPES.IMPORT.INIT,
    payload: data
  }
}

export const getSpecUnit = (productId) => {
  return async (dispatch) => {
    try {
      const response = await Axios.post(API.PRODUCT.GET_SPEC_UNIT, productId, headerConfig);
      dispatch(setSpecUnitSelection(response.data));
    } catch(err) {
      dispatch(showAlertFail(err));
    }
  }
}
export const setSpecUnitSelection = (data) => {
  return {
    type: ACTION_TYPES.IMPORT.SET_SPEC_SELECTION,
    payload: data
  }
}
export const save = (data, branch) => {
  return async (dispatch) => {
    try {
      const response = await Axios.post(API.IMPORT.SAVE, {data, branch}, headerConfig);
      if(response.status === 200) {
        dispatch(saveSuccess());
        dispatch(showAlertAndReset());
      } else {
        dispatch(showAlertFail(response));
      }
    } catch (err) {
      dispatch(showAlertFail(err));
    }
  }
}
export const saveSuccess = () => {
  return {
    type: ACTION_TYPES.IMPORT.SAVE_SUCCESS
  }
}
export const resetSaveSuccess = () => {
  return {
    type: ACTION_TYPES.IMPORT.RESET_SAVE_SUCCESS
  }
}