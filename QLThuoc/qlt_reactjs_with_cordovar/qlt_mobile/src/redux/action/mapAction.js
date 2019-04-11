import Constands from '../../constands';

const {SET_CURRENT_COORDINATE} = Constands.ACTION_TYPE;

export const setCurrentCoordinate = (coordinate) => ({
  type: SET_CURRENT_COORDINATE,
  payload: coordinate
});