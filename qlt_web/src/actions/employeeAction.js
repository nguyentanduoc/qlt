import {API} from '../constants';
import Axios from 'axios';
import header from '../helpers/headerHelper';
import { showAlertFail } from './alertAction';

export const save =  (employee) => {
  return async (dispatch) => {
    try {
      const request = await Axios.post(API.EMPLOYEE.SAVE, employee, header);
      dispatch(showAlertFail(request));
    } catch (err) {
      dispatch(showAlertFail(err));
    }
  }
}