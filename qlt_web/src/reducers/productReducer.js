import { ACTION_TYPES } from "../constants";

const initialState = {
  specUnits:[]
}

export default (state = initialState, { type, payload }) => {
  switch (type) {

  case ACTION_TYPES.PRODUCT.INIT_SUCCESS:
    return { ...state, specUnits: payload.specUnits }

  default:
    return state
  }
}
