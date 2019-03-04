import {ACTION_TYPES} from '../constants';
const initState  = {
  errors:"",
  authentication:{},
  isLogin: false,
  nav:[],
  user: {},
  authorities: []
};
export default (state = initState, action) => {
  switch (action.type) {
    case ACTION_TYPES.LOGIN_SUCCESS:
      return {...state, 
        authentication: action.payload.authentication, 
        isLogin: true, 
        nav: action.payload.nav, 
        user: action.payload.user,
        authorities: action.payload.authorities
      };
    case ACTION_TYPES.LOGOUT:
      return initState;
    default:
      return state;
  }
}
