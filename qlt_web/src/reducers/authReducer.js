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
  branches:[],
  isLoading: false
};
export default (state = initState, action) => {
  switch (action.type) {
    case ACTION_TYPES.AUTH.LOGIN_SUCCESS:
      const payload = action.payload;
      if(payload.branchs && payload.branchs.length > 1) {
          return {...state, 
            authentication: payload.authentication, 
            isLogin: true, 
            nav: payload.nav, 
            user: payload.user,
            authorities: payload.authorities,
            isChooseBranch: true,
            branches: payload.branches
          };
        } else {
          // navBranch(payload.nav, payload.branches[0]);
          return {...state, 
            authentication: payload.authentication,
            isLogin: true, 
            nav: payload.nav,
            user: payload.user,
            authorities: payload.authorities,
            isChooseBranch: false,
            branch: payload.branches[0]
          };
        }

    case ACTION_TYPES.AUTH.SET_BRANCH:
      const nav = navBranch(payload.nav, action.payload);
      return {...state, branch: action.payload, nav: nav}
    
    case ACTION_TYPES.AUTH.LOGOUT:
      return initState;

    case ACTION_TYPES.AUTH.SET_LOADING:
      return {...state, isLoading: !state.isLoading};

    default:
      return state;
  }
}
const navBranch = (navs, branch) => {
  if(branch) {
    navs.forEach(element => {
      _.remove(element.children, function(nav) {
        if(nav.isMain) {
          if(!branch.isMain){
            return nav;
          }
        } else {
          if(branch.isMain){
            return nav;
          }
        }
      });
    });
  }
}
