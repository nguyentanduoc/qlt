import {ACTION_TYPES} from '../constants';

var initState = {
   roles: [],
   role: {},
   hasErrored: false,
   errors: ""
};

export default (state = initState, action) => {
    switch (action.type) {
        case ACTION_TYPES.GET_ALL_ROLE_SUCCESS:
            return {
                ...state, roles: action.payload, hasErrored: false
            }
        case ACTION_TYPES.GET_ALL_ROLE_FAIL:
            return {...state, errors: action.payload, hasErrored:true}
        default:
           return state;
    }
}
