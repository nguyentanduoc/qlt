import {ACTION_TYPES, API} from '../constants';
import {showAlertAndReset, showAlertFail} from "./alertAction";
import Axios from "axios";
import {header} from "../helpers/headerHelper";

const {
  GET_ROLE_SUCCESS,
  GET_ALL_EMPLOYEES_SUCCESS,
  SAVE_SUCCESS,
  SET_EMPLOYEE,
  RESET_MODAL,
  SET_ROLE,
  DELETE_SUCCESS
} = ACTION_TYPES.EMPLOYEE_OF_BRANCH;

const {DELETE} = API.EMPLOYEE;

export const getRolesByLeader = () => (
  async (dispatch, getState) => {
    try {
      const {jwt} = getState().auth;
      const response = await Axios.post(API.EMPLOYEE_OF_BRANCH.GET_ROLES_BY_LEADER, null, {headers:header(jwt)});
      return dispatch(getRolesSuccess(response.data));
    } catch (e) {
      return dispatch(showAlertFail(e));
    }
  }
);

const getRolesSuccess = (data) => ({
  type: GET_ROLE_SUCCESS,
  payload: data
});

export const saveEmployee = (data) => (
  async (dispatch, getState) => {
    try {
      const {jwt} = getState().auth;
      const response = await Axios.post(API.EMPLOYEE_OF_BRANCH.SAVE_EMPLOYEE, data, {headers:header(jwt)});
      dispatch(showAlertAndReset());
      return dispatch(saveSuccess(response.data));
    } catch (e) {
      return dispatch(showAlertFail(e));
    }
  }
);

const saveSuccess = (data) => ({
  type: SAVE_SUCCESS,
  payload: data
});

export const getAllEmployee = (branch) => (
  async (dispatch, getState) => {
    try {
      const {jwt} = getState().auth;
      const response = await Axios.post(API.EMPLOYEE_OF_BRANCH.GET_ALL_EMPLOYEES, branch, {headers:header(jwt)});
      return dispatch(getEmployeesSuccess(response.data));
    } catch (e) {
      return dispatch(showAlertFail(e));
    }
  }
);

const getEmployeesSuccess = (data) => ({
  type: GET_ALL_EMPLOYEES_SUCCESS,
  payload: data
});

export const setInfoEmployee = (employee) => ({
  type: SET_EMPLOYEE,
  payload: employee
});

export const resetModal = () => ({
  type: RESET_MODAL
});

export const setRoleEmployee = (roles) => ({
  type: SET_ROLE,
  payload: roles
});

export const deleteEmployee = (employeeId) => (
  async (dispatch,getState) => {
    try {
      const {jwt} = getState().auth;
      await Axios.post(DELETE,employeeId, {headers:header(jwt)});
      return dispatch(deleteSuccess(employeeId));
    } catch (e) {
      return dispatch(showAlertFail(e));
    }
  }
)

const deleteSuccess = (employeeId) => ({
  type: DELETE_SUCCESS,
  payload: employeeId
})
