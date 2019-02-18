import { ACTION_TYPES } from '../constants';
const initState = {
    flgDeleteMultiple: false,
    deleteMultible: 'radio'
};
export default (state = initState, action) => {
    switch (action.type) {
        case ACTION_TYPES.APP_SETTING.DELETE_MULTIPLE:
            if(state.flgDeleteMultiple) {
                return { ...state, flgDeleteMultiple: !state.flgDeleteMultiple, deleteMultible:'radio'};
            } else {
                return { ...state, flgDeleteMultiple: !state.flgDeleteMultiple, deleteMultible:'checkbox'};
            }
        default:
            return state;
    }
}
