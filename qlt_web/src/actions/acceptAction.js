import {API, ACTION_TYPES} from "../constants";
import {showAlertFail} from "./alertAction";
import Axios from "axios";
import headerHelper from "../helpers/headerHelper";

export const getBillRequest = (branch, condition) => {
  return async (dispatch) => {
    try {
      const response = await Axios.post(API.REQUEST.GET_BILL_REQUEST, {branch, condition}, headerHelper);
      if (response.status === 200) {
        return dispatch(getBillRequestSuccess(response.data))
      } else {
        if (response.status === 404) {
          return dispatch(resultNotFound())
        } else {
          return dispatch(showAlertFail(response));
        }
      }
    } catch (e) {
      return dispatch(showAlertFail(e));
    }
  }
}
export const resultNotFound = () => {
  return {
    type: ACTION_TYPES.ACCEPT.RESULT_NOT_FOUND
  }
}
export const getBillRequestSuccess = (data) => {
  return {
    type: ACTION_TYPES.ACCEPT.GET_ALL_BILL_SUCCESS,
    payload: data
  }
}

export const getDetail = (id) => {
  return async (dispatch) => {
    try {
      const response = await Axios.post(API.REQUEST.GET_DETAIL, id, headerHelper);
      dispatch(getDetailSuccess(response.data));
    } catch (e) {
      return dispatch(showAlertFail(e));
    }
  }
}

export const getDetailSuccess = (data) => {
  return {
    type: ACTION_TYPES.ACCEPT.GET_DETAIL_SUCCESS,
    payload: data
  }
}
export const accept = (id) => {
  return async (dispatch) => {
    try {
      const response = await Axios.post(API.REQUEST.ACCEPT, id, headerHelper);
      if (response.status === 200) {
        return dispatch(acceptSuccess());
      } else {
        return dispatch(showAlertFail("Xác nhận xảy ra lỗi"));
      }
    } catch (e) {
      return dispatch(showAlertFail(e));
    }
  }
}
export const acceptSuccess = () => {
  return {
    type: ACTION_TYPES.ACCEPT.ACCEPT_SUCCESS
  }
}
export const cancel = (id) => {
  return async (dispatch) => {
    try {
      const response = await Axios.post(API.REQUEST.CANCEL, id, headerHelper);
    } catch (e) {
      return dispatch(showAlertFail(e));
    }
  }
}
