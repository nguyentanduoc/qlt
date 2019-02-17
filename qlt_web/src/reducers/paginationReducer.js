import {ACTION_TYPES} from '../constants';

var initState = {
  totalPages:0,
  empty: false,
  number:0,
  show: false,
  totalElements: 0,
  first: false,
  last:false,
  size:0,
  gotoPage: '',
  clicked: false
};
export default (state = initState, action) => {
  switch (action.type) {
      case ACTION_TYPES.PAGINATION.SET_PAGINATION:
          return {
            ...state,
            totalPages: action.payload.totalPages,
            empty: action.payload.empty,
            number: action.payload.number,
            show: action.payload.show,
            totalElements: action.payload.totalElements,
            first: action.payload.first,
            last: action.payload.last,
            size: action.payload.size
          }
      case ACTION_TYPES.PAGINATION.RESET_PAGINATION:
          return {
            ...state, initState
          }
      case ACTION_TYPES.PAGINATION.CLICKED:
          return {
            ...state, gotoPage:action.payload, clicked: true
          }
      case ACTION_TYPES.PAGINATION.RESET_CLICKED: 
          return {
            ...state, gotoPage:'', clicked: false
          }
      default:
         return state;
  }
}
