import {
    ADD_PANTS,
    UPDATE_PANTS,
    SET_FORM_DATA
} from '../actions/FormActions';
import {assign} from 'lodash';

const initialState = {
    formData: {}
};


export default function formReducer(state = initialState, action) {
    switch (action.type) {

        case ADD_PANTS:
            break;
        case UPDATE_PANTS:
            break;
        case SET_FORM_DATA:
            state = assign({}, state, {
                formData: action.state
            });
            break;
        default:
            return state;
    }

    return state;
}
