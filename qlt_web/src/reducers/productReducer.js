import { ACTION_TYPES } from "../constants";

const initialState = {
  specUnits:[],
  units:[],
  producers:[]
}

export default (state = initialState, { type, payload }) => {
  switch (type) {

  case ACTION_TYPES.PRODUCT.INIT_SUCCESS:
    return { ...state, specUnits: payload.specUnits, producers:payload.producers, units: payload.units }

  default:
    return state
  }
}
