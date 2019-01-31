import * as UserAction from '../actions/UserAction';
import {ACTION_TYPES, API, LOCAL_STORAGE, BEARSER} from '../core/constants';

var initState = {
    accessToken: '',
    tokenType: '',
    isLogin: false,
    error: {},
    hasErrored: false,
    principal: {}
};

export function UserPreducer(state = initState, action) {
    switch (action.type) {
        case ACTION_TYPES.LOGIN_SUCCESS:
            const user =  action.payload;
            return {
                ...state,
                isLogin: true,
                accessToken: user.accessToken, 
                tokenType: user.tokenType, 
                principal: user.user.principal,
                hasError: false,
                error: {}
            }
        case ACTION_TYPES.LOGIN_HAS_ERRORED:
            return {...state, error: action.error, hasError:true}
        default:
           return state;
    }
}
