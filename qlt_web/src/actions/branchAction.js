import { API, ACTION_TYPES } from '../constants'
import axios from 'axios'
import headerConfig, { headerForGet } from '../helpers/headerHelper'
import {showAlertFail, showAlertAndReset} from './alertAction.js'
import { setPagination } from '../actions/paginationAction'

export const save = (branch) => {
  return async (dispatch) => {
    try {
      await axios.post(API.BRANCH.SAVE, branch ,headerConfig);
      await dispatch(select());
      await dispatch(showAlertAndReset());
    }
    catch (err) {
      dispatch(showAlertFail(err));
    }
  }
}

export const select = (condition) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(API.BRANCH.SELECT, condition, headerConfig);
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
export const selectAllShop = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get(API.SHOP.SELECT_ALL, headerForGet());
      dispatch(getAllShopSuccess(res.data));
    } catch (err) {
      dispatch(showAlertFail(err));
    }
  }
}
export const getAllShopSuccess = (data) => ({
  type: ACTION_TYPES.BRANCH.GET_ALL_SHOP,
  payload: data
})
export const getBranchOfDirector = (idDirector) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(API.BRANCH.SELECT_BRANCH_OF_DIRECTOR, idDirector, headerConfig); 
      dispatch(branchForSelection(res.data));
    } catch(err) {
      dispatch(showAlertFail(err));
    }
  }
}

export const branchForSelection = (data) => {
  let selection = data.map(b => {
    return {value: b.id, label: b.name}
  });
  return {
    type: ACTION_TYPES.BRANCH.BRANCH_FOR_SELECTION,
    payload: selection
  }
}