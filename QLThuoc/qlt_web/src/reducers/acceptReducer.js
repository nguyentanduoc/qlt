import {ACTION_TYPES} from "../constants";

const initialState = {
  billsRequest: [],
  detailRequest: [],
  flgAcceptSuccess: false,
  flgResultNotFound: false
}

export default (state = initialState, {type, payload}) => {
  switch (type) {

    case ACTION_TYPES.ACCEPT.GET_ALL_BILL_SUCCESS:
      return {...state, billsRequest: payload, flgResultNotFound: false}

    case ACTION_TYPES.ACCEPT.GET_DETAIL_SUCCESS:
      return {...state, detailRequest: payload}

    case ACTION_TYPES.ACCEPT.ACCEPT_SUCCESS:
      return {...state, flgAcceptSuccess: true}

    case ACTION_TYPES.ACCEPT.RESULT_NOT_FOUND:
      return {...state, flgResultNotFound: true}

    default:
      return state
  }
}
