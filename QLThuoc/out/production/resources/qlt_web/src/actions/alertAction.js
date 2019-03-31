import {ALERT_ACTIONS} from '../constants'

export const resetAlert = () => {
  return {
    type: ALERT_ACTIONS.RESET_ALERT
  }
}

export const showAlertAndReset = () => {
  return dispatch => {
    dispatch(showAlertSuccess());
    setTimeout(() => {
      dispatch(resetAlert());
    }, 5000)
  }
}

export const showAlertSuccess = () => {
  return {
    type: ALERT_ACTIONS.IS_SUCCESS,
    payload: "Thao tác thành công"
  }
}

export const showAlertFail = (err) => {
  let message;
  if(typeof(err)==='object' && typeof(err.response) ===  'object' ) {
    switch(err.response.data.status){
      case 404:  message = 'Không tìm thấy url'; break;
      default:
        message = err.response.data.message
    }
  } else {
    if(typeof(err)=== 'string') {
      message = err;
    } else {
      message = err.toString();
    }
  }
  return {
    type: ALERT_ACTIONS.IS_ERRORED,
    payload: message
  }
}
