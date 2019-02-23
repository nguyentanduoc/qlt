import { ACTION_TYPES } from "../constants";

const initialState = {
  shops: [],
  shop: {},
  flgDetail: false
}

export default (state = initialState, { type, payload }) => {
  switch (type) {

  case ACTION_TYPES.SHOP.GET_SUCCESS:
    return { ...state, shops: payload }

  case ACTION_TYPES.SHOP.SET_DETAIL:
    return { ...state, shop: payload, flgDetail: true }

  case ACTION_TYPES.SHOP.RESET: {
    return state;
  }

  case ACTION_TYPES.SHOP.RESET_FLG_DETAIL: {
    return { ...state, flgDetail: false }
  }

  default:
    return state
  }
}
