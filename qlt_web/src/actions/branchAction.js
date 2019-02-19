import {ACTION_TYPES} from '../constants';

export const toggleModal = () => {
  return {
    type: ACTION_TYPES.BRANCH.TOGGLE_MODAL
  }
}
export const resetAllBranch = () => {
  return {
    type: ACTION_TYPES.BRANCH.RESET_ALL
  }
}
