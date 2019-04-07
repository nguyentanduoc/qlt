import {ACTION_TYPES} from "../constants";
import _ from 'lodash';

const initState = {
  roles: [],
  employees:[]
}
const {SAVE_SUCCESS, GET_ROLE_SUCCESS} = ACTION_TYPES.EMPLOYEE_OF_BRANCH;
export default (state = initState, {type, payload}) => {
  let {employees, roles} = {...state};
  switch (type) {

    case GET_ROLE_SUCCESS:
      return {...state, roles: payload};

    case SAVE_SUCCESS:
      employees = employees.push(payload);
      return {...state, employees: employees};

    default:
      return state;
  }
}
