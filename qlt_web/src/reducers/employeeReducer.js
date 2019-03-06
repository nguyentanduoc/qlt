import { ACTION_TYPES } from '../constants'
const initState = {
  branchsSeletion:[],
  rolesSeletion:[]
}
export default (state = initState,{type, payload}) => {
  switch (type) {
    case ACTION_TYPES.EMPLOYEE.INIT:
      return {...state, branchsSeletion:payload.branchsSeletion, rolesSeletion: payload.rolesSeletion}

    default:
      return state;
  }
}