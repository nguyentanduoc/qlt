import {ACTION_TYPES} from "../constants";

const initState = {
  productSelection: [],
  product:[],
  specUnits: [],
  quantity: 0,
  price: 0,
  dataViews: [],
  dataSubmits: [],
  priceHistory:{},
  inventory: 0,
  productDto:{}
};
export default (state = initState, {type, payload}) => {
  switch (type) {

    case ACTION_TYPES.EXPORT.GET_PRODUCT_SUCCESS:
      let productSelection = [];
      payload.forEach(function(e){
        productSelection.push(e.product);
      });
      return {...state, product: payload, productSelection: productSelection};

    case ACTION_TYPES.EXPORT.GET_SPEC_UNIT_SUCCESS:
      return {...state, specUnits: payload.specUnits, quantity: payload.quantity, price: payload.price, priceHistory: payload.priceHistory, productDto: payload.productDto};

    case ACTION_TYPES.EXPORT.SET_DETAIL_BILL:
      const dataView = {
        productName: payload.product.label,
        amount: payload.amount,
        specUnit: payload.specUnit.label,
        price: payload.price,
        priceHistory: payload.priceHistory
      };
      let dataSubmits = state.dataSubmits;
      let dataViews = state.dataViews;
      dataSubmits.push(payload);
      dataViews.push(dataView);
      return  {...state, dataSubmits:dataSubmits , dataViews: dataViews};

    case ACTION_TYPES.EXPORT.GET_INVENTORY:
      return {...state, inventory: payload};

    default:
      return state;
  }
}

const totalAmount = (productDto, ) => {

};
