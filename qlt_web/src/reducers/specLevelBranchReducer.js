import {ACTION_TYPES} from "../constants";
import _ from 'lodash';

const initialState = {
  specLevelBranches: []
};

export default (state = initialState, {type, payload}) => {
  switch (type) {

    case ACTION_TYPES.SPEC_LEVEL_BRANCH.SAVE_SUCCESS:
      return {...state, specLevelBranches: payload};

    case ACTION_TYPES.SPEC_LEVEL_BRANCH.GET_ALL_SUCCESS:
      return {...state, specLevelBranches: payload};

    case ACTION_TYPES.SPEC_LEVEL_BRANCH.DELETE_SUCCESS:
      let {specLevelBranches} = state;
      _.remove(specLevelBranches, (element) => {
        return element.id === payload
      });
      return {...state, specLevelBranches: specLevelBranches};

    default:
      return state
  }
}
