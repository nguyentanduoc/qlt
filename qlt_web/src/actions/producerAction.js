import {ACTION_TYPES, API} from '../constants';
import Axios from "axios";
import {header} from "../helpers/headerHelper";
import {showAlertAndReset, showAlertFail} from "./alertAction";

export const getAllReducer = () => (
  async (dispatch, getState) => {
    try {
      const {jwt} = getState().auth;
      const response = await Axios.post(API.PRODUCER.GET_ALL, null, {headers: header(jwt)});
      dispatch(getAllProducerSuccess(response.data));
    } catch (e) {
      dispatch(showAlertFail(e));
    }
  }
);
const getAllProducerSuccess = (data) => ({
  type: ACTION_TYPES.PRODUCER.GET_ALL_SUCCESS,
  payload: data
});
export const save = (data) => (
  async (dispatch, getState) => {
    try {
      const {jwt} = getState().auth;
      const response = await Axios.post(API.PRODUCER.SAVE, data, {headers: header(jwt)});
      dispatch(showAlertAndReset());
      dispatch(saveSuccess(response.data));
    } catch (e) {
      dispatch(showAlertFail(e));
    }
  }
);
const saveSuccess = (data) => ({
  type: ACTION_TYPES.PRODUCT.SET_PRODUCER,
  payload: data
});

