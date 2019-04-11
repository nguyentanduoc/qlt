import Constant from '../../constands'

const initState = {
  currentCoordinate:{}
};

const {SET_CURRENT_COORDINATE} = Constant.ACTION_TYPE;

export default (state = initState, {type, payload}) => {
  switch (type) {
    case SET_CURRENT_COORDINATE:
      return {...state, currentCoordinate: payload};

    default:
      return state
  }
}