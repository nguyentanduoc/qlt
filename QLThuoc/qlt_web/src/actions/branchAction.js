import {ACTION_TYPES, API} from '../constants'
import axios from 'axios'
import headerConfig, {header} from '../helpers/headerHelper'
import {showAlertAndReset, showAlertFail} from './alertAction.js'
import {setPagination} from '../actions/paginationAction'

export const save = (branch) => {
  return async (dispatch, getState) => {
    try {
      const {jwt} = getState().auth;
      const res = await axios.post(API.BRANCH.SAVE, branch, {headers: header(jwt)});
      await dispatch(setPagination(res.data));
      await dispatch(selectSuccess(res.data.content));
      await dispatch(showAlertAndReset());
    } catch (err) {
      dispatch(showAlertFail(err));
    }
  }
};

export const select = (condition) => {
  return async (dispatch,getState) => {
    try {
      const {jwt} = getState().auth;
      const res = await axios.post(API.BRANCH.SELECT, condition, {headers: header(jwt)});
      console.log(res);
      dispatch(setPagination(res.data));
      dispatch(selectSuccess(res.data.content));
    } catch (err) {
      console.log(err);
      dispatch(showAlertFail(err));
    }
  }
};

export const selectSuccess = (data) => {
  return {
    type: ACTION_TYPES.BRANCH.GET_SUCCESS,
    payload: data
  }
};

export const setBranch = (data) => {
  return {
    type: ACTION_TYPES.BRANCH.SET_BRANCH,
    payload: data
  }
};

export const resetAll = () => {
  return {type: ACTION_TYPES.BRANCH.RESET_ALL}
};

export const resetBranch = () => {
  return {type: ACTION_TYPES.BRANCH.RESET_BRANCH}
};

export const deleteBranch = (keys) => {
  return async (dispatch, getState) => {
    try {
      const {jwt} = getState().auth;
      await axios.post(API.BRANCH.DELETE, keys, {headers: header(jwt)});
      dispatch(showAlertAndReset());
    } catch (err) {
      dispatch(showAlertFail(err));
    }
  }
};
// export const selectAllShop = () => {
//   return async (dispatch) => {
//     try {
//       const header = await headerForGet();
//       const res = await axios.get(API.SHOP.SELECT_ALL, header);
//       dispatch(getAllShopSuccess(res.data));
//     } catch (err) {
//       dispatch(showAlertFail(err));
//     }
//   }
// };
export const getAllShopSuccess = (data) => ({
  type: ACTION_TYPES.BRANCH.GET_ALL_SHOP,
  payload: data
});
export const getBranchOfDirector = (idDirector) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(API.BRANCH.SELECT_BRANCH_OF_DIRECTOR, idDirector, headerConfig);
      dispatch(branchForSelection(res.data));
    } catch (err) {
      dispatch(showAlertFail(err));
    }
  }
};

export const branchForSelection = (data) => {
  let selection = data.map(b => {
    return {value: b.id, label: b.name}
  });
  return {
    type: ACTION_TYPES.BRANCH.BRANCH_FOR_SELECTION,
    payload: selection
  }
};
export const getSpecLevelBranch = () => {
  return async (dispatch, getState) => {
    try {
      const {jwt} = getState().auth;
      const response = await axios.post(API.SPEC_LEVEL_BRANCH.GET_ALL_FOR_SELECTION, null, {headers: header(jwt)});
      return dispatch(getSpecLevelBranchSuccess(response.data));
    } catch (e) {
      return dispatch(showAlertFail(e));
    }
  }
};
export const getSpecLevelBranchSuccess = (data) => (
  {
    type: ACTION_TYPES.BRANCH.GET_SPEC_LEVEL_BRANCH_SUCCESS,
    payload: data
  }
);
export const getAddress = (coordinate) => (
  async dispatch => {
    try {
      const response = await axios.get(
        'https://reverse.geocoder.api.here.com/6.2/reversegeocode.json',
        {
          params: {
            prox: `${coordinate[1]},${coordinate[0]}`,
            mode: "retrieveAddresses",
            maxresults: 1,
            gen: 9,
            app_id: 'sZmrR2s7WtYGtVPXpmAa',
            app_code: '5d3Mq2cEAozaZcr6Rs4QbQ'
          }
        }
      );
      dispatch(getAddressSuccess(response.data.Response.View[0].Result[0].Location.Address.Label));
    } catch (e) {
      dispatch(showAlertFail(e));
    }
  }
);
const getAddressSuccess = (data) => ({
  type: ACTION_TYPES.BRANCH.GET_ADDRESS_SUCCESS,
  payload: data
});
export const countMemberOfBranch = () => (
  async (dispatch, getState) => {
    try {
      const {branch, jwt} = getState().auth;
      const response = await axios.post(API.BRANCH.COUNT_MEMBER_OF_BRANCH, branch, {headers: header(jwt)});
      dispatch({
        type: ACTION_TYPES.BRANCH.COUNT_MEMBER_SUCCESS,
        payload: response.data
      });
    } catch (e) {
      dispatch(showAlertFail(e));
    }
  }
);
export const search = (data) => (
  async (dispatch, getState) => {
    try {
      const {jwt} = getState().auth;
      const response = await axios.post(API.BRANCH.SEARCH, data, {headers: header(jwt)});
      dispatch(getAllShopSuccess(response.data));
    } catch (e) {
      dispatch(showAlertFail(e));
    }
  }
);
