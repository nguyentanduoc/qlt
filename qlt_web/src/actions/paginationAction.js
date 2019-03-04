import { ACTION_TYPES } from '../constants';
export const setPagination = (data) => {
  if(data.totalPages){
    let payload = {
      show: data.totalPages > 1 ? true : false,
      totalPages:data.totalPages,
      empty: data.empty,
      number:data.number,
      totalElements: data.totalElements,
      first: data.first,
      last:data.last,
      size:data.size
    }
    return {
      type: ACTION_TYPES.PAGINATION.SET_PAGINATION,
      payload: payload
    }
  } else {
    return {
      type: ACTION_TYPES.PAGINATION.RESET_PAGINATION
    }
  }
}
export const resetPagination = () => {
  return {
    type: ACTION_TYPES.PAGINATION.RESET_PAGINATION
  }
}
export const clicked = (gotoPage) => {
  return {
    type: ACTION_TYPES.PAGINATION.CLICKED,
    payload: gotoPage
  }
}
export const resetClicked = () => {
  return {
    type: ACTION_TYPES.PAGINATION.RESET_CLICKED
  }
}