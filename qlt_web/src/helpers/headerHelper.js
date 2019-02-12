import {LOCAL_STORAGE } from '../constants';

export const header = () => {
    let token = sessionStorage.getItem(LOCAL_STORAGE.ACCESS_KEY);
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