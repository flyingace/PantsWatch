/*globals */

import {
    SELECT_PANTS,
    DESELECT_ALL_PANTS,
    REQUEST_PANTS_DATA,
    RECEIVE_PANTS_DATA,
    FAILURE_PANTS_DATA,
    COMPLETELY_RESET_DATA
} from '../actions/PantsListActions';
import {assign, forEach, isUndefined, toLower } from 'lodash';

const initialState = {
    pantsData: {}
};

export default function pantsListReducer(state = initialState, action) {
    switch (action.type) {
        case SELECT_PANTS:
            break;

        case REQUEST_PANTS_DATA:
            break;

        case RECEIVE_PANTS_DATA:
            state = assign({}, state, {
                pantsData: action.state
            });
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
