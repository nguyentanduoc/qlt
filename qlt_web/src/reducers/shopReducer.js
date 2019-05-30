import { ACTION_TYPES } from "../constants";
import _ from 'lodash'

const initialState = {
  shops: [],
  shop: {},
  flgDetail: false,
  account:{},
  flgSaveSucess: false,
  password:'',
  isOpenModal: false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {

  case ACTION_TYPES.SHOP.GET_SUCCESS:
    return { ...state, shops: payload }

  case ACTION_TYPES.SHOP.SET_DETAIL:
    return { ...state, shop: payload, flgDetail: true }

  case ACTION_TYPES.SHOP.RESET: {
    return state;
  }

  case ACTION_TYPES.SHOP.RESET_FLG_DETAIL: {
    return { ...state, flgDetail: false }
  }

  case ACTION_TYPES.SHOP.DELETE_SUCCESS: {
    let results = [];
    payload.forEach((id) => {
      const result = state.shops.filter(shop => {
        return shop.id === id
      });
      results.push(result[0]);
    });
    let shops = _.difference(state.shops, results);
    return { ...state, shops: shops }
  }

  case ACTION_TYPES.SHOP.SAVE_SUCCESS: {
    let results = state.shops;
    results.push(payload.shop);
    return { ...state, shops:results, account: payload.account, flgSaveSucess:true, password: payload.password }
  }

  case ACTION_TYPES.SHOP.RESET_SAVE_SUCCESS: {
    return {...state, flgSaveSucess: false}
  }

  case ACTION_TYPES.SHOP.TOGGLE_MODAL: {
    return { ...state, isOpenModal: !state.isOpenModal}
  }

  default:
    return state
  }
}
