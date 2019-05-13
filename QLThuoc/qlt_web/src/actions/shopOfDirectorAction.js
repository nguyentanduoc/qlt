import {showAlertFail} from "./alertAction";
import Axios from "axios";
import {ACTION_TYPES, API} from "../constants";
import {header} from "../helpers/headerHelper";

export const getShopOfDirector = () => (
  async (dispatch, getState) => {
    try {
      const {jwt} = getState().auth;
      const response = await Axios.post(API.SHOP_OF_DIRECTOR.GET_SHOP_OF_DIRECTOR, null, {headers:header(jwt)});
      return dispatch(getShopSuccess(response.data));
    } catch (e) {
      return dispatch(showAlertFail(e));
    }
  }
);
export const getShopSuccess = (data) => ({
  type: ACTION_TYPES.SHOP_OF_DIRECTOR.GET_SHOP_SUCCESS,
  payload: data
});
export const updateShop = (data) => (
  async (dispatch, getState) => {
    try {
      const {jwt} = getState().auth;
      const response = await Axios.post(API.SHOP_OF_DIRECTOR.UPDATE_SHOP, data, {headers: header(jwt)});
      return dispatch(saveSuccess(response.data));
    } catch (e) {
      return dispatch(showAlertFail(e));
    }
  }
);
export const saveSuccess = (data) => ({
  type: ACTION_TYPES.SHOP_OF_DIRECTOR.UPDATE_SUCCESS,
  payload: data
});
export const getReportShop = () => (
  async (dispatch,getState ) => {
    try {
      const {jwt} = getState().auth;
      const response = await Axios.post(API.SHOP_OF_DIRECTOR.GET_REPORT, null, {headers:header(jwt)});
      dispatch(getReportSuccess(response.data));
    } catch (e) {
      dispatch(showAlertFail(e));
    }
  }
);
const getReportSuccess = (data) => ({
  type: ACTION_TYPES.SHOP_OF_DIRECTOR.GET_REPORT_SUCCESS,
  payload: data
});
