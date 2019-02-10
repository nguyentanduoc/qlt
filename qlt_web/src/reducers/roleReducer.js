import {ACTION_TYPES} from '../constants';

var initState = {
   roles: [],
   role: {},
   hasErrored: false,
   errors: "",
   userRoleDetail: {},
   isOpenRoleListOfUser: false
};

export default (state = initState, action) => {
    switch (action.type) {
        case ACTION_TYPES.GET_ALL_ROLE_SUCCESS:
            return {...state, roles: action.payload, hasErrored: false }
        case ACTION_TYPES.GET_ALL_ROLE_FAIL:
            return {...state, errors: action.payload, hasErrored:true}
        case ACTION_TYPES.OPEN_LIST_ROLE_OF_USER:
            return {...state, isOpenRoleListOfUser: true, userRoleDetail: action.payload}
        case ACTION_TYPES.SET_ROLE_USER:
            return {...state, userRoleDetail: action.payload}
        case ACTION_TYPES.REMOVE_USER_DETAIL_FOR_ROLE:
            return {...state, userRoleDetail: {}, isOpenRoleListOfUser:  false}
        default:
           return state;
    }
}
