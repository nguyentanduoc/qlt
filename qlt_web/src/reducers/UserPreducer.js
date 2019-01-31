import {ACTION_TYPES} from '../constants';

var initState = {
   users: [],
   user: {},
   hasErrored: false,
   errors: "",
   updateIsSuccess: false
};

export default (state = initState, action) => {
    switch (action.type) {
        case ACTION_TYPES.GET_ALL_USER_SUCCESS:
            return {
                ...state, users: action.payload, hasErrored: false
            }
        case ACTION_TYPES.LOGIN_HAS_ERRORED:
            return {...state, errors: action.payload, hasErrored:true}
        case ACTION_TYPES.SHOW_USER:
            return {...state, user:action.payload}
        case ACTION_TYPES.UPDATE_USER_SUCCESS: 
            return{...state, updateIsSuccess: true}
        default:
           return state;
    }
}
