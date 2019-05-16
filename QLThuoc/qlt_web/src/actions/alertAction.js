import {ALERT_ACTIONS} from '../constants'

export const resetAlert = () => {
  return {
    type: ALERT_ACTIONS.RESET_ALERT
  }
};

export const showAlertAndReset = () => {
  return dispatch => {
    dispatch(showAlertSuccess());
  }
};

export const showAlertErrorAndReset = (message) => {
  return dispatch => {
    dispatch(showError(message));
    setTimeout(() => {
      dispatch(resetAlert());
    }, 3000)
  }
};

export const showAlertSuccess = () => {
  return {
    type: ALERT_ACTIONS.IS_SUCCESS,
    payload: "Thao tác thành công"
  }
};

export const showAlertFail = (err) => {
  return (dispatch, getState) => {
    let message;
    if (typeof (err) === 'object' && typeof (err.response) === 'object') {
      switch (err.response.data.status) {
        case 404:
          message = 'Không tìm thấy url';
          break;

        case 'BAD_REQUEST':
          err.response.data.message.includes('chi_nhanh_kinh_do_key') ? message = 'Trùng Tọa độ!' : message = err.response.data.message;
          break;

        default:
          message = err.response.data.message
      }
    } else {
      if (typeof (err) === 'string') {
        message = err;
      } else {
        message = err.toString();
      }
    }
    dispatch(showError(message));
  }
};
export const showError = (message) => ({
  type: ALERT_ACTIONS.IS_ERRORED,
  payload: message
});
export const clearAll = () => ({
  type: ALERT_ACTIONS.CLEAR_ALL
});

