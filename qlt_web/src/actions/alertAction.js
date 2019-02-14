import {ALERT_ACTIONS} from '../constants'

export const resetAlert = () => {
  return {
    type: ALERT_ACTIONS.RESET_ALERT
  }
}

export const showAlertSuccess = (message) => {
  return {
    type: ALERT_ACTIONS.IS_SUCCESS,
    payload: message
  }
}

export const showAlertFail = (message) => {
  return {
    type: ALERT_ACTIONS.IS_ERRORED,
    payload: message
  }
}

