import { ACTION_TYPES } from "../constants";

const initialState = {
  products: [],
  specUnitSelection: [], 
  saveSuccess: false
}

export default (state = initialState, { type, payload }) => {
  switch (type) {

  case ACTION_TYPES.IMPORT.INIT:
    return { ...state, products: payload.products }
  
  case ACTION_TYPES.IMPORT.SET_SPEC_SELECTION:
    return { ...state, specUnitSelection: payload }
  
  case ACTION_TYPES.IMPORT.SAVE_SUCCESS:
    return { ...state, saveSuccess: true }
  case ACTION_TYPES.IMPORT.RESET_SAVE_SUCCESS:
    return { ...state, saveSuccess: false }
    default:
      return state
  }
}
