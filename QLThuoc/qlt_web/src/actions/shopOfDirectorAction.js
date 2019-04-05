import {showAlertFail} from "./alertAction";
import Axios from "axios";
import {API, ACTION_TYPES} from "../constants";
import headerHelper from "../helpers/headerHelper";

export const getShopOfDirector = () => (
  async (dispatch) => {
    try {
      const response = await Axios.post(API.SHOP_OF_DIRECTOR.GET_SHOP_OF_DIRECTOR, null, headerHelper);
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
  async (dispatch) => {
    try {
      const response = await Axios.post(API.SHOP_OF_DIRECTOR.UPDATE_SHOP, data, headerHelper);
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
