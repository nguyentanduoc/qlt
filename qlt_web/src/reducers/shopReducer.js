import { ACTION_TYPES } from "../constants";

const initialState = {
  shops: []
}

export default (state = initialState, { type, payload }) => {
  switch (type) {

  case ACTION_TYPES.SHOP.GET_SUCCESS:
    return { ...state, shops: payload }

  default:
    return state
  }
}
