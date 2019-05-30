import {ACTION_TYPES} from "../constants";

const initState = {
  shop: {},
  report: {}
};
export default (state = initState, {type, payload}) => {
  const {GET_SHOP_SUCCESS, UPDATE_SUCCESS, GET_REPORT_SUCCESS} = ACTION_TYPES.SHOP_OF_DIRECTOR;
  switch (type) {

    case GET_SHOP_SUCCESS:
      return {...state, shop: payload};

    case UPDATE_SUCCESS:
      return {...state, shop: payload};

    case GET_REPORT_SUCCESS:
      return {...state, report: payload};

    default:
      return state;
  }
}
