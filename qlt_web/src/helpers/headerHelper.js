import {LOCAL_STORAGE } from '../constants';
const token = sessionStorage.getItem(LOCAL_STORAGE.ACCESS_KEY);
export const header = () => {
    if (token) {
        return { 
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        };
    } else {
        return {
            'Content-Type': 'application/json'
        };
    }
}
export const headerForGet = (params) => {
    return {
        headers : {
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + token,
        },
        params: params
    }
}


export default {headers: header()};