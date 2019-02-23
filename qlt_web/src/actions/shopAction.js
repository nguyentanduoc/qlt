import {ACTION_TYPES, API} from '../constants'
import axios from 'axios'
import headerConfig, { headerForGet } from '../helpers/headerHelper'
import { showAlertFail, showAlertAndReset } from './alertAction.js'
import { setPagination } from '../actions/paginationAction'
import { pageRequestDefault } from '../helpers/pageable'

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

export const select = (condition) => {
  return async (dispatch) => {
    try {
      let params = {...pageRequestDefault()};
      params.condition = condition;
      const res = await axios.get(API.SHOP.SELECT, headerForGet(params));
      dispatch(setPagination(res.data));
      dispatch(selectSuccess(res.data.content));
    }
    catch (err) {
      dispatch(showAlertFail(err));
    }
  }
}

export const selectSuccess = (data) => {
  return {
    type: ACTION_TYPES.SHOP.GET_SUCCESS,
    payload: data
  }
}
