import {API, ACTION_TYPES} from '../constants';
import Axios from 'axios';
import header from '../helpers/headerHelper';
import {showAlertFail, showAlertAndReset} from './alertAction';

export const init = (idDirector) => {
  return async (dispatch) => {
    try {
      const request = await Axios.post(API.EMPLOYEE.INIT, idDirector, header);
      dispatch(initSuccess(request.data));
    } catch (err) {
      dispatch(showAlertFail(err));
    }
  }
};
export const initSuccess = (data) => {
  return {
    type: ACTION_TYPES.EMPLOYEE.INIT,
    payload: data
  }
};

export const save = (employee) => {
  return async (dispatch) => {
    try {
      const request = await Axios.post(API.EMPLOYEE.SAVE, employee, header);
      if (request.status === 200) {
        dispatch(saveSuccess(request.data));
        dispatch(showAlertAndReset());
      } else {
        dispatch(showAlertFail("Không nhận dạng lỗi"));
      }
    } catch (err) {
      dispatch(showAlertFail(err));
    }
  }
};
export const deleteEmployee = (id) => (
  async (dispatch) => {
    try {
      const response = await Axios.post(API.EMPLOYEE.DELETE, id, header);
      if (response.status === 200) {
        return dispatch(deleteSuccess(id));
      } else {
        return dispatch(showAlertFail("Xóa thất bại"));
      }
    } catch (e) {
      return dispatch(showAlertFail(e))
    }
  }
);
export const saveSuccess = (data) => ({
  type: ACTION_TYPES.EMPLOYEE.SAVE_SUCCESS,
  payload: data
});
export const deleteSuccess = (data) => ({
  type: ACTION_TYPES.EMPLOYEE.DELETE_SUCCESS,
  payload: data
});
export const showInfo = (employee) => ({
  type: ACTION_TYPES.EMPLOYEE.SHOW_INFO,
  payload: employee
});
export const toggleModal = () => ({
  type: ACTION_TYPES.EMPLOYEE.TOGGLE_MODAL,
});
export const setBranchesForEmployeeInfo = (branches) => ({
  type: ACTION_TYPES.EMPLOYEE.SET_BRANCHES_FOR_EMPLOYEE_INFO,
  payload: branches
});

export const setRolesForEmployeeInfo = (roles) => ({
  type: ACTION_TYPES.EMPLOYEE.SET_ROLES_FOR_EMPLOYEE_INFO,
  payload: roles
});
