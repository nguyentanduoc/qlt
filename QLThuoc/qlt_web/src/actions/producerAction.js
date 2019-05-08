import {API, ACTION_TYPES} from '../constants';
import Axios from "axios";
import headerHelper from "../helpers/headerHelper";
import {showAlertAndReset, showAlertFail} from "./alertAction";

export const getAllReducer = () => (
  async dispatch => {
    try {
      const response = await Axios.post(API.PRODUCER.GET_ALL, null, headerHelper);
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
  async dispatch => {
    try {
      const response = await Axios.post(API.PRODUCER.SAVE, data, headerHelper);
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
})

