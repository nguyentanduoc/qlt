import axios from 'axios';
import { LOGIN } from '../actions/types';
import { API_BASE_URL } from '../constants';
const LOGIN_URL = API_BASE_URL + "/auth/login";

const initialState = {
    isAuthen: false,
    userName: "",
    fullName: "",
    token: ""
};

const login = async (state, auth) => {
    var headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    };
    console.log("go to login");
    await axios.post(LOGIN_URL, auth, {headers: headers})
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.log(err);
    });
    return {
        state, auth
    }
}

export default (state = initialState, action) => {
    switch(action.type) {
        case LOGIN:
            console.log(action);
            return login(state, action.payload);
        default: 
            return state;
    }
}