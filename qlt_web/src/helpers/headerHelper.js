import {LOCAL_STORAGE} from '../constants';

const token = sessionStorage.getItem(LOCAL_STORAGE.ACCESS_KEY);
export const header = (requestToken) => {
  if (token) {
    return {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    };
  } else {
    if (requestToken && requestToken !== '') {
      return {
        'Authorization': 'Bearer ' + requestToken,
        'Content-Type': 'application/json'
      };
    } else {
      return {
        'Content-Type': 'application/json'
      };
    }
  }
};
export const headerForGet = (params, requestToken) => {
  if (requestToken && requestToken !== "") {
    return {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + requestToken,
      },
      params: params
    }
  } else {
    return {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + token,
      },
      params: params
    }
  }
};


export default {headers: header()};
