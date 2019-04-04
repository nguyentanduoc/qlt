import {ACTION_TYPES} from '../constants';
import _ from 'lodash';

const initState = {
  branchesSelection: [],
  rolesSelection: [],
  employees: [],
  employeeInfo: {},
  visibleModal: false
};
export default (state = initState, {type, payload}) => {
  switch (type) {
    case ACTION_TYPES.EMPLOYEE.INIT:
      const {branches, roles, employees} = payload;
      return {...state, branchesSelection: branches, rolesSelection: roles, employees: employees};

    case ACTION_TYPES.EMPLOYEE.SAVE_SUCCESS:
      let em = state.employees;
      const index = _.findIndex(em, (e) => e.id === payload.id);
      index < 0 ? em.push(payload): em.splice(index, 1, payload);
      return {...state, employees: em};

    case ACTION_TYPES.EMPLOYEE.DELETE_SUCCESS:
      const empBefore = {...state.employees};
      const empAfter = _.filter(empBefore, (o) => o.id !== payload);
      console.log(empBefore);
      return {...state, employees: empAfter};

    case ACTION_TYPES.EMPLOYEE.SHOW_INFO:
      return {...state, employeeInfo: payload, visibleModal: true};

    case ACTION_TYPES.EMPLOYEE.TOGGLE_MODAL:
      return {...state, employeeInfo: {}, visibleModal: false};

    case ACTION_TYPES.EMPLOYEE.SET_ROLES_FOR_EMPLOYEE_INFO:
      let employeeInfoRole = {...state.employeeInfo};
      employeeInfoRole.roles = payload;
      return {...state, employeeInfo: employeeInfoRole};

    case ACTION_TYPES.EMPLOYEE.SET_BRANCHES_FOR_EMPLOYEE_INFO:
      let employeeInfoBranches = {...state.employeeInfo};
      employeeInfoBranches.branches = payload;
      return {...state, employeeInfo: employeeInfoBranches};

    default:
      return state;
  }
}
