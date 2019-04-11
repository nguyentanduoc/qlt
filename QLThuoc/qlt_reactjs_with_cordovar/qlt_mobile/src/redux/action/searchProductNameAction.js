import Constands from '../../constands';
import {config} from '../../helper/header';
import Axios from "axios";

const {SEARCH_PRODUCT_NAME, SEARCH_PRODUCT_OF_BRANCH} = Constands.URL.PRODUCT;
const {SEARCH_PRODUCT_NAME_HAS_ERROR, SEARCH_PRODUCT_NAME_SUCCESS, GET_PRODUCT_OF_BRANCH_SUCCESS, SET_BRANCH_SELECTED} = Constands.ACTION_TYPE;

export const searchProductName = (key) => (
  async (dispatch) => {
    try {
      const response = await Axios.post(SEARCH_PRODUCT_NAME, key, config);
      return dispatch(searchSuccess(response.data));
    } catch (e) {
      return dispatch(searchFail(e));
    }
  }
);
const searchSuccess = (data) => ({
  type: SEARCH_PRODUCT_NAME_SUCCESS,
  payload: data
});
const searchFail = (error) => ({
  type: SEARCH_PRODUCT_NAME_HAS_ERROR,
  payload: error
});

export const searchProductOfBranch = (productAndLocation) => (
  async (dispatch) => {
    try {
      const response = await Axios.post(SEARCH_PRODUCT_OF_BRANCH, productAndLocation, config);
      return dispatch(searchProductOfBranchSuccess(response.data));
    } catch (e) {
      return dispatch(searchFail(e));
    }
  }
);
const searchProductOfBranchSuccess = (data) => ({
  type: GET_PRODUCT_OF_BRANCH_SUCCESS,
  payload: data
});

export const setBranchSelected = (branch) =>({
  type:SET_BRANCH_SELECTED,
  payload: branch
});