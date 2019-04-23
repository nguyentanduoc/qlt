import {API, ACTION_TYPES} from '../constants';
import Axios from "axios";
import headerHelper from "../helpers/headerHelper";
import {showAlertFail} from "./alertAction";

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
})
