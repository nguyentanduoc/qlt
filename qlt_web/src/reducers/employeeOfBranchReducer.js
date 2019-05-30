import {ACTION_TYPES} from "../constants";
import _ from 'lodash';

const initState = {
  roles: [],
  employees: [],
  visibleModal: false,
  employee: {}
}
const {
  SAVE_SUCCESS,
  GET_ROLE_SUCCESS,
  GET_ALL_EMPLOYEES_SUCCESS,
  SET_EMPLOYEE,
  RESET_MODAL,
  SET_ROLE,
  DELETE_SUCCESS
} = ACTION_TYPES.EMPLOYEE_OF_BRANCH;
export default (state = initState, {type, payload}) => {
  let {employees, employee} = {...state};
  let customEmployee = {...employee};
  switch (type) {

    case GET_ROLE_SUCCESS:
      return {...state, roles: payload};

    case SAVE_SUCCESS:
      const index = _.findIndex(employees, (e) => e.id === payload.id);
      index < 0 ? employees.push(payload): employees.splice(index, 1, payload);
      return {...state, employees: employees};

    case GET_ALL_EMPLOYEES_SUCCESS:
      return {...state, employees: payload};

    case SET_EMPLOYEE:
      return {...state, employee: payload, visibleModal: true};

    case RESET_MODAL:
      return {...state, employee: {}, visibleModal: false};

    case SET_ROLE:
      customEmployee.roles = payload;
      return {...state, employee: customEmployee};

    case DELETE_SUCCESS:
      const empBefore = {...state.employees};
      const empAfter = _.filter(empBefore, (o) => o.id !== payload);
      return {...state, employees: empAfter};

    default:
      return state;
  }
}
