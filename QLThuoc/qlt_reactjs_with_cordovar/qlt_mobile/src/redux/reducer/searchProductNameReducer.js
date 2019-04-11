import Constands from '../../constands'

const initState = {
  productNames: [],
  isErrored: false,
  errorMessage: '',
  branches: [],
  branchSelected: {}
};

const {SEARCH_PRODUCT_NAME_SUCCESS, SEARCH_PRODUCT_NAME_HAS_ERROR, GET_PRODUCT_OF_BRANCH_SUCCESS, SET_BRANCH_SELECTED} = Constands.ACTION_TYPE;

export default (state = initState, {type, payload}) => {
  switch (type) {
    case SEARCH_PRODUCT_NAME_SUCCESS:
      return {...state, productNames: payload};

    case SEARCH_PRODUCT_NAME_HAS_ERROR:
      return {...state, isErrored: true, errorMessage: payload};

    case GET_PRODUCT_OF_BRANCH_SUCCESS:
      return {...state, branches: payload};

    case SET_BRANCH_SELECTED:
      return {...state, branchSelected: payload};

    default:
      return state
  }
}