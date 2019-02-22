import { API, ACTION_TYPES } from '../constants'
import axios from 'axios'
import headerConfig, { headerForGet } from '../helpers/headerHelper'
import {showAlertFail, showAlertAndReset} from './alertAction.js'
import { pageRequestDefault } from '../helpers/pageable'
import { setPagination } from '../actions/paginationAction'

export const save = (branch) => {
  return async (dispatch) => {
    try {
      await axios.post(API.BRANCH.SAVE, branch ,headerConfig);
      dispatch(select());
      dispatch(showAlertAndReset());
    }
    catch (err) {
      dispatch(showAlertFail(err));
    }
  }
}

export const select = (condition) => {
  return async (dispatch) => {
    try {
      let params = {...pageRequestDefault()};
      params.condition = condition;
      const res = await axios.get(API.BRANCH.SELECT, headerForGet(params));
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
    type: ACTION_TYPES.BRANCH.GET_SUCCESS,
    payload: data
  }
}

export const setBranch = (data) => {
  return {
    type: ACTION_TYPES.BRANCH.SET_BRANCH,
    payload: data
  }
}

export const resetAll = () => {
  return { type: ACTION_TYPES.BRANCH.RESET_ALL }
}

export const resetBranch = () => {
  return { type: ACTION_TYPES.BRANCH.RESET_BRANCH }
}

export const deleteBranch = (keys) => {
  return async (dispatch) => {
    try {
      await axios.post(API.BRANCH.DELETE, keys ,headerConfig);
      dispatch(showAlertAndReset());
    } catch (err) {
      dispatch(showAlertFail(err));
    }
  }
}