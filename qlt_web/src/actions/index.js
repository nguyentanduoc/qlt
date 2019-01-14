import * as types from './types';

export const login = (authDto) => {
    return {
        type: types.LOGIN,
        authDto
    }
}