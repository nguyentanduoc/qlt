import { API, ACTION_TYPES} from '../constants';
import Axios from 'axios';
import header from '../helpers/headerHelper';
import { showAlertFail, showAlertAndReset } from './alertAction';

export const init = (idDirector) => {
  return async (dispatch) => {
    try {
      const request = await Axios.post(API.EMPLOYEE.INIT, idDirector, header);
      dispatch(initSuccess(request.data));
    } catch (err) {
      dispatch(showAlertFail(err));
    }
  }
}
export const initSuccess = (requestData) => {
  let branchsSelection = requestData.branchs.map(b => {
    return {value: b.id, label: b.name}
  });
  let rolesSeletion = requestData.roles.map(r => {
    return {value: r.id, label: r.detail}
  })
  
  return {
    type: ACTION_TYPES.EMPLOYEE.INIT,
    payload:{
      branchsSeletion: branchsSelection,
      rolesSeletion: rolesSeletion
    }
  }
}

export const save = (employee) => {
  return async (dispatch) => {
    try {
      const request = await Axios.post(API.EMPLOYEE.SAVE, employee, header);
      if(request.status === 200){
        dispatch(showAlertAndReset());
      } else {
        dispatch(showAlertFail("Không nhận dạng lỗi"));
      }
    } catch (err) {
      dispatch(showAlertFail(err));
    }
  }
}
