import {ACTION_TYPES} from "../constants";

const initialState = {
  units: [],
};

export default (state = initialState, {type, payload}) => {
  switch (type) {

    case ACTION_TYPES.SPEC_UNIT.INIT_SUCCESS:
      return {...state, units: payload}

    default:
      return state
  }
}
