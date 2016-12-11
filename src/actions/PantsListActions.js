import {forEach} from 'lodash';
import DB from '../../db.js';
import { DBEvents } from 'react-native-db-models';

export const SELECT_PANTS = 'SELECT_PANTS';
export const WEAR_PANTS = 'WEAR_PANTS';
export const WASH_PANTS = 'WASH_PANTS';
export const DELETE_PANTS = 'DELETE_PANTS';
export const REQUEST_PANTS_DATA = 'REQUEST_PANTS_DATA';
export const RECEIVE_PANTS_DATA = 'RECEIVE_PANTS_DATA';
export const FAILURE_PANTS_DATA = 'FAILURE_PANTS_DATA';
export const COMPLETELY_RESET_DATA = 'COMPLETELY_RESET_DATA';


export function completelyResetData() {
    return {type: COMPLETELY_RESET_DATA}
}

export function selectPants() {
    return {type: SELECT_PANTS};
}

export function requestPantsData() {
    return {type: REQUEST_PANTS_DATA}
}

export function receivePantsData(data) {
    return {type: RECEIVE_PANTS_DATA, state: data}
}

export function failurePantsData() {
    return {type: FAILURE_PANTS_DATA}
}

export function resetData() {
}

export function fetchPantsData() {
    return (dispatch) => {
        dispatch(requestPantsData());

        return DB.pants.get_all( (data) => {
            dispatch(receivePantsData(data));
        })
    }
}

export function filterNameList(letter) {
    return {type: FILTER_NAME_LIST, letter};
}