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

//TODO: I think that perhaps what you need to do is to do the first load of the data
//when the application loads, and then when the data is updated, update the pantsData
//that exists in state and update the db separately
//I THINK THIS IS WHERE YOUR PROBLEM IS
//Perhaps it's b/c of asynchronicity or perhaps because of a need for promises
//Except that the reducer, when logged, will show the data, it just never gets into the props!

export function fetchPantsData() {
    return (dispatch) => {
        dispatch(requestPantsData());

        return DB.pants.get_all( (data) => {
            dispatch(receivePantsData(data));
        })
    }
}

export function fetchRoundData() {
    const dateKey = getDateKey();
    const recordsKey = `records/${dateKey}`;
    const recordsRef = database.ref(recordsKey);

    return (dispatch) => {
        dispatch(requestRoundData());

        //TODO: How can this be refactored?
        //this takes only the previous round's data
        return recordsRef.orderByKey().limitToLast(1).on('value', (data) => {
            const previousRoundKey = Object.keys(data.val())[0];
            const mostRecentRound = data.val()[previousRoundKey];
            dispatch(receiveRoundData(mostRecentRound));
        })
    }
}

export function filterNameList(letter) {
    return {type: FILTER_NAME_LIST, letter};
}

// export function goToDescribePage() {
//     return (dispatch) => {
//         dispatch(push('/describe'));
//     }
// }
