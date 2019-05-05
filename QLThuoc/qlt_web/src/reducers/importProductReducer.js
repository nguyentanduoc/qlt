import {ACTION_TYPES} from "../constants";

const initialState = {
  products: [],
  specUnitSelection: [],
  saveSuccess: false,
  billsImport: [],
  detail: [],
  product: {}
};

export default (state = initialState, {type, payload}) => {
  switch (type) {

    case ACTION_TYPES.IMPORT.INIT:
      return {...state, products: payload.products};

    case ACTION_TYPES.IMPORT.SET_SPEC_SELECTION:
      return {...state, specUnitSelection: payload.specUnit, product: payload.product};

    case ACTION_TYPES.IMPORT.SAVE_SUCCESS:
      return {...state, saveSuccess: true};

    case ACTION_TYPES.IMPORT.RESET_SAVE_SUCCESS:
      return {...state, saveSuccess: false};

    case ACTION_TYPES.IMPORT.SEARCH_SUCCESS:
      return {...state, billsImport: payload};

    case ACTION_TYPES.IMPORT.GET_DETAIL_SUCCESS:
      return {...state, detail: payload};

    default:
      return state
  }
}
