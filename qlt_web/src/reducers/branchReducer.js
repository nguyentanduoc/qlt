import { ACTION_TYPES } from '../constants'
const initialState = {
  branchs: [],
  branch: {},
  flgSet: false
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ACTION_TYPES.BRANCH.GET_SUCCESS:
      return { ...state, branchs: payload }
    case ACTION_TYPES.BRANCH.SET_BRANCH:
      return { ...state, branch: payload, flgSet: true }
    case ACTION_TYPES.BRANCH.RESET_ALL: 
      return state 
    case ACTION_TYPES.BRANCH.RESET_BRANCH: 
      return {...state, branch: {}, flgSet: false}
  default:
    return state
  }
}
