import { ALERT_ACTIONS } from '../constants';
const initState = {
    isShow: false,
    message: "",
    color: ""
};
export default (state = initState, action) => {
    switch (action.type) {
        case ALERT_ACTIONS.IS_SUCCESS:
            return { ...state, isShow: true, message: action.payload , color: "success"};
        case ALERT_ACTIONS.IS_ERRORED:
            return { ...state, isShow: true, message: action.payload, color: "danger"};
        case ALERT_ACTIONS.RESET_ALERT:
            return initState;
        default:
            return state;
    }
}
