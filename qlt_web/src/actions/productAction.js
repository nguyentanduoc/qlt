import { API, ACTION_TYPES } from '../constants'
import Axios from 'axios';
import header from '../helpers/headerHelper';
import { showAlertFail } from './alertAction';


export const save = (form) => {
  return async (dispatch) => {
    try {
      const request = Axios.post(API.PRODUCT.SAVE, form, header);
      console.log(request);
      dispatch(showAlertFail("done"))
    } catch (err) {
      console.log(err.response);
      dispatch(showAlertFail(err))
    }
  }
}