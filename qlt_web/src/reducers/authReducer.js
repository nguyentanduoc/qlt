import {ACTION_TYPES} from '../constants';
import _ from 'lodash';
const initState  = {
  errors:"",
  authentication:{},
  isLogin: false,
  nav:[],
  user: {},
  authorities: [],
  isChooseBranch: false,
  branch:{},
  branchs:[]
};
export default (state = initState, action) => {
  switch (action.type) {
    case ACTION_TYPES.AUTH.LOGIN_SUCCESS:
      const payload = action.payload;
      if(payload.branchs) {
        if(payload.branchs.length > 1) {
          
          return {...state, 
            authentication: payload.authentication, 
            isLogin: true, 
            nav: payload.nav, 
            user: payload.user,
            authorities: payload.authorities,
            isChooseBranch: true,
            branchs: payload.branchs
          };
        } else {
          navBranch(payload.nav, payload.branchs[0]);
          return {...state, 
            authentication: payload.authentication, 
            isLogin: true, 
            nav: payload.nav, 
            user: payload.user,
            authorities: payload.authorities,
            isChooseBranch: false,
            branch: payload.branchs[0]
          };
        }
      } else {
        return {...state, 
          authentication: payload.authentication, 
          isLogin: true, 
          nav: payload.nav, 
          user: payload.user,
          authorities: payload.authorities
        };
      }

    case ACTION_TYPES.AUTH.SET_BRANCH: 
      return {...state, branch: action.payload}
    
    case ACTION_TYPES.AUTH.LOGOUT:
      return initState;
    
    default:
      return state;
  }
}
const navBranch = (navs, branch) => {
  navs.forEach(element => {
    if(element.url === "/bill") {
      _.remove(element.children, function(nav) {
        if(branch.isMain === true) {
          if(nav.url === "/bill/request-products") {
            return nav;
          }
        } else {
          if(nav.url === "/bill/accept-request-products" || nav.url === "/bill/buy-products") {
            return nav;
          }
        }
      });
    }
  });
}