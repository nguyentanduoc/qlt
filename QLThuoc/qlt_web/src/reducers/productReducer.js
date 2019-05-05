import {ACTION_TYPES} from "../constants";

const initialState = {
  specUnits: [],
  units: [],
  producers: [],
  productSearch: [],
  priceHistories: []
}

export default (state = initialState, {type, payload}) => {
  switch (type) {

    case ACTION_TYPES.PRODUCT.INIT_SUCCESS:
      return {...state, specUnits: payload.specUnits, producers: payload.producers, units: payload.units}

    case  ACTION_TYPES.PRODUCT.SEARCH_SUCCESS:
      return {...state, productSearch: payload};

    case ACTION_TYPES.PRODUCT.SET_PRODUCER:
      return {...state, producers: payload};

    case ACTION_TYPES.PRODUCT.SEARCH_PRICE_PRODUCT_SUCCESS:
      return {...state, priceHistories: payload}

    default:
      return state
  }
}
