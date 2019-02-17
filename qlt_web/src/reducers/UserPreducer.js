import {ACTION_TYPES} from '../constants';

var initState = {
   users: [],
   user: {},
   userDetailForRole:{},
   hasErrored: false,
   errors: "",
   updateIsSuccess: false,
   showAlert: false,
   listUserSearch: [],
   flgClickRow: false
};

export default (state = initState, action) => {
    switch (action.type) {
        case ACTION_TYPES.GET_ALL_USER_SUCCESS:
            return {...state, users: action.payload, hasErrored: false}
        case ACTION_TYPES.LOGIN_HAS_ERRORED:
            return {...state, errors: action.payload, hasErrored:true}
        case ACTION_TYPES.SHOW_USER:
            return {...state, user: action.payload}
        case ACTION_TYPES.UPDATE_USER_SUCCESS:
            return{...state, updateIsSuccess: true, showAlert: true}
        case ACTION_TYPES.USER_DETAIL_FOR_ROLE:
            return {...state, userDetailForRole: action.payload}
        case ACTION_TYPES.SET_CLOSE_ALERT:
            return {...state, showAlert: false}
        case ACTION_TYPES.USER.GET_USERS_SUCCESS:
            return {...state, users: action.payload}
        case ACTION_TYPES.USER.SET_USER_DETAIL:
            return {...state, user: action.payload, flgClickRow: true}
        case ACTION_TYPES.USER.RESET_USER_DETAIL:
            return {...state, user: {}, flgClickRow: false}
        default:
           return state;
    }
}
