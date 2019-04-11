import Constands from '../../constands';
import header from '../../helper/header';
import Axios from "axios";

const {SEARCH_PRODUCT_NAME} = Constands.URL.PRODUCT;
const {SEARCH_PRODUCT_NAME_HAS_ERROR, SEARCH_PRODUCT_NAME_SUCCESS} = Constands.ACTION_TYPE;

export const searchProductName = (key) => (
  async (dispatch) => {
    try {
      const response = await Axios.post(SEARCH_PRODUCT_NAME, key, header);
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
})