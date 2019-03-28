import {ACTION_TYPES} from "../constants";

const initState = {
  productSelection: [],
  product:[]
}
export default (state = initState, {type, payload}) => {
  switch (type) {

    case ACTION_TYPES.EXPORT.GET_PRODUCT_SUCCESS:
      let productSelection = [];
      payload.forEach(function(e){
        productSelection.push(e.product);
      })
      return {...state, product: payload, productSelection: productSelection}

    default:
      return state;
  }
}
