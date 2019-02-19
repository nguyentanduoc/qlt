import {ACTION_TYPES} from '../constants'
const initialState = {
  toggleModal: false
}

export default (state = initialState, { type, payload }) => {
  switch (type) {

  case ACTION_TYPES.BRANCH.TOGGLE_MODAL:
    return { ...state, toggleModal: !state.toggleModal }

  case ACTION_TYPES.BRANCH.RESET_ALL:
    return { ...state, toggleModal: false }

  default:
    return state
  }
}
