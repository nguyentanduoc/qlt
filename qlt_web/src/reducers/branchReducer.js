import {ACTION_TYPES} from '../constants'

const initialState = {
  branchs: [],
  branch: {},
  flgSet: false,
  shops: [],
  branchSelection: [],
  specLevelBranchReducer: [],
  address: '',
  memberOfBranch: 0,
  report: {}
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case ACTION_TYPES.BRANCH.GET_SUCCESS:
      return {...state, branchs: payload};

    case ACTION_TYPES.BRANCH.SET_BRANCH:
      return {...state, branch: payload, flgSet: true};

    case ACTION_TYPES.BRANCH.RESET_ALL:
      return state;

    case ACTION_TYPES.BRANCH.RESET_BRANCH:
      return {...state, branch: {}, flgSet: false};

    case ACTION_TYPES.BRANCH.GET_ALL_SHOP:
      return {...state, shops: payload};

    case ACTION_TYPES.BRANCH.BRANCH_FOR_SELECTION:
      return {...state, branchSelection: payload};

    case ACTION_TYPES.BRANCH.GET_SPEC_LEVEL_BRANCH_SUCCESS:
      return {...state, specLevelBranchReducer: payload};

    case ACTION_TYPES.BRANCH.GET_ADDRESS_SUCCESS:
      return {...state, address: payload};

    case ACTION_TYPES.BRANCH.COUNT_MEMBER_SUCCESS:
      return {...state, memberOfBranch: payload};

    case ACTION_TYPES.BRANCH.GET_REPORT_SUCCESS:
      return {...state, report: payload};

    default:
      return state
  }
}
