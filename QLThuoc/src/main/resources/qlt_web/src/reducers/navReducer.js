import { NAV_ACTION_TYPE } from '../constants';

var initState = {
    navTitles: [],
    subNav: [],
    roleNav: [],
    nav: {}
};

export default (state = initState, action) => {
    switch (action.type) {
        case NAV_ACTION_TYPE.GET_ALL_NAV_SUCCESS:
            return { ...state, navTitles: action.payload }
        case NAV_ACTION_TYPE.GET_ALL_SUB_NAV:
            return { ...state, subNav: action.payload }
        case NAV_ACTION_TYPE.SET_ROLE_FOR_NAV:
            return { ...state, roleNav: action.payload }
        case NAV_ACTION_TYPE.SET_NAV:
            return { ...state, nav: action.payload }
        case NAV_ACTION_TYPE.UPDATE_SUCCESS:
            return { ...state, nav: action.payload }
        case NAV_ACTION_TYPE.RESET_ALL: 
            return { ...state, state }
        default:
            return state;
    }
}
