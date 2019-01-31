import {ACTION_TYPES} from '../constants';
const initState  = {
  users:[],
  user: {},
  isError: false,
  errors:{},
  authenticate:{},
  isLogin: false
};
export default (state = initState, action) => {
  switch (action.type) {
    case ACTION_TYPES.LOGIN_SUCCESS:
      return {...state, authenticate: action.payload, isError: false};
    case ACTION_TYPES.LOGIN_HAS_ERRORED:
      return {...state, errors: action.payload, isError: true};
    default:
      return state;
  }
}
