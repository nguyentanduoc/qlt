import {ACTION_TYPES} from '../constants';
const initState  = {
  users:[],
  user: {},
  isError: false,
  errors:"",
  authentication:{},
  isLogin: false,
  nav:[]
};
export default (state = initState, action) => {
  switch (action.type) {
    case ACTION_TYPES.LOGIN_SUCCESS:
    console.log(action.payload);
      return {...state, authentication: action.payload.authentication, isError: false, isLogin: true, nav: action.payload.nav};
    case ACTION_TYPES.LOGIN_HAS_ERRORED:
      return {...state, errors: action.payload, isError: true};
    default:
      return state;
  }
}
