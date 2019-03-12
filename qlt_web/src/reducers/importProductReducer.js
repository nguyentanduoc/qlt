import { ACTION_TYPES } from "../constants";

const initialState = {
  products: []
}

export default (state = initialState, { type, payload }) => {
  switch (type) {

  case ACTION_TYPES.IMPORT.INIT:
    return { ...state, products: payload.products }

  default:
    return state
  }
}
