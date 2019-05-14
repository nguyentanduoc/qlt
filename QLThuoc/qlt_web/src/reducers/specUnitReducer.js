import {ACTION_TYPES} from "../constants";

const initialState = {
  specUnits: [],
  units: []
};

export default (state = initialState, {type, payload}) => {
  switch (type) {

    case ACTION_TYPES.SPEC_UNIT.INIT_SUCCESS:
      return {...state, specUnits: payload};

    case ACTION_TYPES.SPEC_UNIT.GET_ALL_UNIT_SUCCESS:
      return {...state, units: payload};

    case ACTION_TYPES.SPEC_UNIT.SAVE_UNIT_SUCCESS:
      return {...state, specUnits: payload};

    case ACTION_TYPES.SPEC_UNIT.SAVE_SUCCESS:
      return {...state, specUnits: payload};

    default:
      return state
  }
}
