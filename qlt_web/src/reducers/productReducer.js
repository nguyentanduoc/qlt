import {ACTION_TYPES} from "../constants";

const initialState = {
  specUnits: [],
  units: [],
  producers: [],
  productSearch: [],
  priceHistories: [],
  productOnBranch: [],
  product: {},
};

export default (state = initialState, {type, payload}) => {
  switch (type) {

    case ACTION_TYPES.PRODUCT.INIT_SUCCESS:
      return {...state, specUnits: payload.specUnits, producers: payload.producers, units: payload.units}

    case  ACTION_TYPES.PRODUCT.SEARCH_SUCCESS:
      return {...state, productSearch: payload};

    case ACTION_TYPES.PRODUCT.SET_PRODUCER:
      return {...state, producers: payload};

    case ACTION_TYPES.PRODUCT.SEARCH_PRICE_PRODUCT_SUCCESS:
      return {...state, priceHistories: payload};

    case ACTION_TYPES.PRODUCT.SEARCH_PRODUCT_ON_STORE_SUCCESS:
      return {...state, productOnBranch: payload};

    case ACTION_TYPES.PRODUCT.GET_PRODUCT_BY_ID_SUCCESS:
      return {
        ...state,
        product: payload.product,
        units: payload.units,
        specUnits: payload.specUnits
      };

    case ACTION_TYPES.PRODUCT.SET_SPEC_UNIT:
      return {
        ...state,
        specUnits: payload
      };

    case ACTION_TYPES.PRODUCT.SET_UNIT:
      return {
        ...state,
        units: payload
      };

    default:
      return state
  }
}
