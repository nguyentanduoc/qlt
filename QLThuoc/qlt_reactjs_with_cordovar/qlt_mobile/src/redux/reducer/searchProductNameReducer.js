import Constands from '../../constands'

const initState = {
  productNames: [],
  isErrored: false,
  errorMessage: ''
}

const {SEARCH_PRODUCT_NAME_SUCCESS, SEARCH_PRODUCT_NAME_HAS_ERROR} = Constands.ACTION_TYPE;

export default (state = initState, {type, payload}) => {
  switch (type) {
    case SEARCH_PRODUCT_NAME_SUCCESS:
      return {...state, productNames: payload};

    case SEARCH_PRODUCT_NAME_HAS_ERROR:
      return {...state, isErrored: true, errorMessage: payload};

    default:
      return state
  }
}