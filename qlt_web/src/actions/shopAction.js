import {ACTION_TYPES, API} from '../constants'
import axios from 'axios'
import headerConfig, { headerForGet } from '../helpers/headerHelper'
import {showAlertFail, showAlertAndReset} from './alertAction.js'

export const save = (shop) => {
  console.log(shop);
  return async (dispatch) => {
    try {
      await axios.post(API.SHOP.SAVE, shop ,headerConfig);
      dispatch(showAlertAndReset());
    } catch(err) {
      dispatch(showAlertFail(err));
    }
  }
}
