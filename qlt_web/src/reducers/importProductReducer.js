import { ACTION_TYPES } from "../constants";

const initialState = {
  products: [],
  specUnitSelection: []
}

export default (state = initialState, { type, payload }) => {
  switch (type) {

  case ACTION_TYPES.IMPORT.INIT:
    return { ...state, products: payload.products }
  
  case ACTION_TYPES.IMPORT.SET_SPEC_SELECTION:
    console.log(payload);
    return { ...state, specUnitSelection: payload }
  
    default:
      return state
  }
}
