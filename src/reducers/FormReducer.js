import {
    ADD_PANTS,
    ADD_PANTS_BRAND,
    ADD_PANTS_COLOR,
    ADD_PANTS_NAME,
    ADD_PANTS_STYLE,
    UPDATE_PANTS,
    SET_FORM_DATA
} from '../actions/FormActions';
import { assign } from 'lodash';

const initialState = {
    formData: {},
    pantsBrand: '',
    pantsColor: '',
    pantsName: '',
    pantsStyle: ''
};


export default function formReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_PANTS:
            break;
        case ADD_PANTS_BRAND:
            state = assign({}, state, {
                pantsBrand: action.state
            });
            break;
        case ADD_PANTS_COLOR:
            state = assign({}, state, {
                pantsColor: action.state
            });
            break;
        case ADD_PANTS_NAME:
            state = assign({}, state, {
                pantsName: action.state
            });
            break;
        case ADD_PANTS_STYLE:
            state = assign({}, state, {
                pantsStyle: action.state
            });
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
