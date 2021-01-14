import { FETCH_DATA } from './types';
import API from '../services/API';

export const getUserMessages = (): object => async dispatch => {

    const response = await API.getUserMessage();
    const { data } = response;
    dispatch({
        type: FETCH_DATA,
        payload: data
    });
};