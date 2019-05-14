import {ACTION_TYPES, API} from '../constants';

const initialState = {
  products: [],
  unit: [],
  amount: 0,
  flgSaveSuccess: false,
  billsRequest: [],
  details: []
};

export default (state = initialState, {type, payload}) => {
  switch (type) {

    case ACTION_TYPES.REQUEST.SET_PRODUCT:
      return {...state, products: payload};

    case ACTION_TYPES.REQUEST.SET_UNIT:
      return {...state, unit: payload};

    case ACTION_TYPES.REQUEST.GET_AMOUNT_PRODUCT_SUCCESS:
      return {...state, amount: payload.amount, priceHistory: payload.priceHistory};

    case ACTION_TYPES.REQUEST.SAVE_SUCCESS:
      return {...state, flgSaveSuccess: true};

    case ACTION_TYPES.REQUEST.RESET_SAVE_SUCCESS:
      return {...state, flgSaveSuccess: false};

    case ACTION_TYPES.REQUEST.SEARCH_SUCCESS:
      return {...state, billsRequest: payload};

    case ACTION_TYPES.REQUEST.GET_DETAIL_SUCCESS:
      return {...state, details: payload};

    default:
      return state
  }
}
