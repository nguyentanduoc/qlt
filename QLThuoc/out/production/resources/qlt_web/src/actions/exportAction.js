import {ACTION_TYPES, API} from "../constants";
import {showAlertFail} from "./alertAction";
import Axios from "axios";
import headerHelper from "../helpers/headerHelper";

export const getAllProduct = (branch) => {
  return async (dispatch) => {
    try {
      const response = await Axios.post(API.PRODUCT.GET_ALL_PRODUCT_BY_BRANCH, branch, headerHelper);
      return dispatch(getProductSuccess(response.data));
    } catch (e) {
      return dispatch(showAlertFail(e));
    }
  }
}

export const getProductSuccess = (data) => ({
  type: ACTION_TYPES.EXPORT.GET_PRODUCT_SUCCESS,
  payload: data
})
