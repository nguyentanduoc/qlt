import {ACTION_TYPES} from '../constants';
const initState  = {
  users:[],
  user: {},
  errors:"",
  authentication:{},
  isLogin: false,
  nav:[]
};
export default (state = initState, action) => {
  switch (action.type) {
    case ACTION_TYPES.LOGIN_SUCCESS:
      return {...state, authentication: action.payload.authentication, isLogin: true, nav: action.payload.nav};
    case ACTION_TYPES.LOGOUT:
      return {...state, authentication: {}, isLogin: false, nav: []};
    default:
      return state;
  }
}
