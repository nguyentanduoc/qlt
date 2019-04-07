import {API, ACTION_TYPES} from '../constants';
import {showAlertFail} from "./alertAction";
import Axios from "axios";
import headerHelper from "../helpers/headerHelper";

export const getRolesByLeader = () => (
  async (dispatch) => {
    try{
      const response = await Axios.post(API.EMPLOYEE_OF_BRANCH.GET_ROLES_BY_LEADER, null, headerHelper);
      return dispatch(getRolesSuccess(response.data));
    }catch (e) {
      return showAlertFail(e);
    }
  }
);
const getRolesSuccess = (data) =>({
  type: ACTION_TYPES.EMPLOYEE_OF_BRANCH.GET_ROLE_SUCCESS,
  payload: data
});
export const saveEmployee  = (data) => (
  async (dispatch) => {
    try{
      const response = await Axios.post(API.EMPLOYEE_OF_BRANCH.SAVE_EMPLOYEE, data, headerHelper);
      return dispatch(saveSuccess(response.data));
    } catch (e) {
      return showAlertFail(e);
    }
  }
)

const saveSuccess = (data) =>({
  type: ACTION_TYPES.EMPLOYEE_OF_BRANCH.SAVE_SUCCESS,
  payload: data
})
