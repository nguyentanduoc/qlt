import { ACTION_TYPES } from '../constants';
const initialState = {
    products: [],
    unit: [],
    amount: 0
}

export default (state = initialState, { type, payload }) => {
  switch (type) {

  case ACTION_TYPES.REQUEST.SET_PRODUCT:
    return { ...state, products: payload }
  
  case ACTION_TYPES.REQUEST.SET_UNIT: 
    return {...state, unit: payload}

  case ACTION_TYPES.REQUEST.GET_AMOUNT_PRODUCT_SUCCESS:
    console.log(payload)
    return {...state, amount: payload}

  default:
    return state
  }
}
