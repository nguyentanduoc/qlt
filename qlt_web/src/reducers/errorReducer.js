import {ACTION_TYPES} from '../constants';
const initialState = { 
    isErrored: false,
    errorMessage: '',
    isShowAlert: false
};

export default (state = initialState, action) => {
    switch(action.type) {
        case ACTION_TYPES.HAS_ERROR:
            return {...state, isErrored: true, errorMessage: action.payload, isShowAlert: true};
        case ACTION_TYPES.RESET_ERROR:
            return {...state, isErrored: false, errorMessage: '', isShowAlert: false};
        default: 
            return state;
    }
}