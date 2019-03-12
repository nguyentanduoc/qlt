import { API } from '../constants'
import Axios from 'axios';
import header from '../helpers/headerHelper';
import { showAlertFail, showAlertSuccess } from './alertAction';


export const save = (form) => {
  return async (dispatch) => {
    try {
      await Axios.post(API.PRODUCT.SAVE, form, header);
      dispatch(showAlertSuccess());
    } catch (err) {
      dispatch(showAlertFail(err));
    }
  }
}