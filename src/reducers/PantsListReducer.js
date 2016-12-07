/*globals */

import {
    SELECT_PANTS,
    REQUEST_PANTS_DATA,
    RECEIVE_PANTS_DATA,
    FAILURE_PANTS_DATA,
    COMPLETELY_RESET_DATA
} from '../actions/PantsListActions';
import {assign, forEach, isUndefined, toLower } from 'lodash';

const initialState = {
    pantsData: {}
};

// function filterByLetter(state, letter) {
//     const nameList = state.nameList;
//     const filteredNames = {};
//
//     if (isUndefined(letter)) {
//         return nameList;
//     }
//
//     forEach(nameList, (listItem, key) => {
//         if (toLower(listItem.name.charAt(0)) === toLower(letter)) {
//             filteredNames[key] = listItem;
//         }
//     });
//
//     return filteredNames;
// }

export default function pantsList(state = initialState, action) {
    switch (action.type) {
        case SELECT_PANTS:
            break;

        case REQUEST_PANTS_DATA:
            break;

        case RECEIVE_PANTS_DATA:
            state = assign({}, state, {
                pantsData: action.state
            });
            console.log(state);
            break;

        case FAILURE_PANTS_DATA:
            break;

        case COMPLETELY_RESET_DATA:
            break;

        default:
            return state;
    }

    return state;
}
