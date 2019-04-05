import {ACTION_TYPES} from "../constants";

const initState = {
  shop: {},
};
export default (state = initState, {type, payload}) => {
  const {GET_SHOP_SUCCESS, UPDATE_SUCCESS} = ACTION_TYPES.SHOP_OF_DIRECTOR;
  switch (type) {

    case GET_SHOP_SUCCESS:
      return {...state, shop: payload};

    case UPDATE_SUCCESS:
      return {...state, shop: payload};

    default:
      return state;
  }
}
