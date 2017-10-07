import {
    RECEIVE_PANTS_DATA,
    DELETE_PANTS
} from '../actions/DetailActions';
import { assign } from 'lodash';

const initialState = {
    pantsData: {}
};

export default function detailReducer(state = initialState, action) {
    switch (action.type) {
    case RECEIVE_PANTS_DATA:
        state = assign({}, state, {
            pantsData: action.state
        });
        break;
    case DELETE_PANTS:
        break;
    default:
        break;
    }

    return state;
}
