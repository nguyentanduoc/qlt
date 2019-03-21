import { API } from '../constants';
import Axios from 'axios';
import headerConfig, { headerForGet } from '../helpers/headerHelper'
import {showAlertFail, showAlertAndReset} from './alertAction.js'

export const getAllProduct = () => {
  return async (dispatch) => {
    try {
      const request = await Axios.get(API.PRODUCT.GET_PRODUCT_FOR_REQUEST, headerForGet());
      return dispatch(showAlertFail(JSON.stringify(request)))
    } catch (err) {
      return dispatch(showAlertFail(err))
    }
  }
}