import _ from 'lodash';
import {ACTION_TYPES} from "../constants";

const initState = {
  productSelection: [],
  product: [],
  specUnits: [],
  price: 0,
  priceShare: 0,
  dataViews: [],
  dataSubmits: [],
  priceHistory: {},
  inventory: 0,
  productDto: {},
  total: 0,
  isPrint: false,
  isShare: false,
  billsExport: [],
  detailExport: [],
  printDataView: []
};
export default (state = initState, {type, payload}) => {
  switch (type) {

    case ACTION_TYPES.EXPORT.GET_PRODUCT_SUCCESS:
      let productSelection = [];
      payload.forEach(function (e) {
        productSelection.push(e.product);
      });
      return {...state, product: payload, productSelection: productSelection};

    case ACTION_TYPES.EXPORT.GET_SPEC_UNIT_SUCCESS:
      return {
        ...state,
        specUnits: payload.specUnits,
        inventory: payload.inventory,
        price: payload.price,
        priceShare: payload.priceShare,
        priceHistory: payload.priceHistory,
        productDto: payload.productDto
      };

    case ACTION_TYPES.EXPORT.SET_DETAIL_BILL:
      const price = unitPrice(state.productDto, state.specUnitsDto, payload.specUnit, payload.price);
      const dataView = {
        productName: payload.product.label,
        amount: payload.amount,
        specUnit: payload.specUnit.label,
        price: price,
        priceHistory: payload.priceHistory,
      };
      let dataSubmits = state.dataSubmits;
      let dataViews = state.dataViews;
      dataSubmits.push(payload);
      dataViews.push(dataView);
      const total = state.total + (price * payload.amount);
      return {...state, dataSubmits: dataSubmits, dataViews: dataViews, total: total};

    case ACTION_TYPES.EXPORT.GET_INVENTORY:
      return {...state, inventory: payload};

    case ACTION_TYPES.EXPORT.DELETE:
      const dataViewMinus = _.filter(state.dataViews, (o) => {
        return o.productName !== payload.productName
      });
      const dataSubmitMinus = _.filter(state.dataSubmits, (o) => {
        return o.product.label !== payload.productName
      });
      const totalMinus = state.total - payload.amount * payload.price;
      return {...state, dataViews: dataViewMinus, dataSubmits: dataSubmitMinus, total: totalMinus};

    case ACTION_TYPES.EXPORT.SET_IS_PRINT:
      return {...state, isPrint: !state.isPrint};

    case ACTION_TYPES.EXPORT.CLEAR_DETAIL:
      return {...state, printDataView: state.dataViews, dataViews: [], dataSubmits: []};

    case ACTION_TYPES.EXPORT.SEARCH_SUCCESS:
      return {...state, billsExport: payload};

    case ACTION_TYPES.EXPORT.GET_DETAIL_SUCCESS:
      return {...state, detailExport: payload}

    default:
      return state;
  }
}

const unitPrice = (productDto, specUnitsDto, specUnitChoose, price) => {
  const {specUnits} = productDto;
  const specUnit = _.find(specUnits, function (o) {
    return o.id === specUnitChoose.value;
  });
  if (specUnit.unitIn.id === productDto.unit.id) {
    return price;
  } else {
    if (productDto.unit.id === specUnit.unitOut.id) {
      return price * specUnit.amount;
    } else {
      return price / specUnit.amount;
    }
  }
};
