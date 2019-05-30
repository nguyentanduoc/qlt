import {ACTION_TYPES} from '../constants';

const initialState = {
  producers: [],
}

export default (state = initialState, {type, payload}) => {
  switch (type) {

    case ACTION_TYPES.PRODUCER.GET_ALL_SUCCESS:
      return {...state, producers: payload};

    case ACTION_TYPES.PRODUCER.SAVE_SUCCESS:
      return {...state, producers: payload};

    default:
      return state
  }
}
