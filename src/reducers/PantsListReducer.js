import {
    SELECT_PANTS,
    REQUEST_PANTS_DATA,
    RECEIVE_PANTS_DATA,
    FAILURE_PANTS_DATA,
    COMPLETELY_RESET_DATA
} from '../actions/PantsListActions';
import { assign } from 'lodash';

const initialState = {
    pantsData: []
};

function extractPantsData(bigObj) {
    let extractedData = {};
    if (bigObj.rows) {
        extractedData = Object.values(bigObj.rows);
    }

    return extractedData;
}

export default function pantsListReducer(state = initialState, action) {
    switch (action.type) {
        case SELECT_PANTS:
            break;

        case REQUEST_PANTS_DATA:
            break;

        case RECEIVE_PANTS_DATA:
            const extractedData = extractPantsData(action.state);
            console.log(extractedData);

            state = assign({}, state, {
                pantsData: extractedData
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
