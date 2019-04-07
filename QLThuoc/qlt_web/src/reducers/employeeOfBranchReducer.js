import {ACTION_TYPES} from "../constants";

const initState = {
  roles: []
}
export default (state = initState, {type, payload}) => {
  switch (type) {

    case ACTION_TYPES.EMPLOYEE_OF_BRANCH.GET_ROLE_SUCCESS:
      return {...state, roles: payload};

    default:
      return state;
  }
}
