import {
    RECEIVE_BRANDS_DATA,
    RECEIVE_COLORS_DATA,
    RECEIVE_STYLES_DATA,
    REQUEST_BRANDS_DATA,
    REQUEST_COLORS_DATA,
    REQUEST_STYLES_DATA,
    SET_PANTS,
    SET_PANTS_ID,
    SET_PANTS_NAME,
    SET_PANTS_COLOR,
    SET_PANTS_BRAND,
    SET_PANTS_STYLE,
    SET_PANTS_WEAR_COUNT,
    SET_PANTS_WEAR_LIMIT,
    SET_PANTS_LAST_WORN_DATE,
    UPDATE_PANTS
} from '../actions/FormActions';
import { assign } from 'lodash';

const initialState = {
    brandValues: {},
    colorValues: {},
    styleValues: {},
    pantsId: null,
    pantsBrand: 'jCrew',
    pantsColor: 'blue',
    pantsName: '',
    pantsStyle: 'casual',
    pantsWearCount: 0,
    pantsWearLimit: 6,
    lastWornDate: ''
};


export default function formReducer(state = initialState, action) {
    switch (action.type) {
        case REQUEST_BRANDS_DATA:
            break;
        case RECEIVE_BRANDS_DATA:
            state = assign({}, state, {
                brandValues: action.state
            });
            break;
        case REQUEST_COLORS_DATA:
            break;
        case RECEIVE_COLORS_DATA:
            state = assign({}, state, {
                colorValues: action.state
            });
            break;
        case REQUEST_STYLES_DATA:
            break;
        case RECEIVE_STYLES_DATA:
            state = assign({}, state, {
                styleValues: action.state
            });
            break;
        case SET_PANTS:
            break;
        case SET_PANTS_ID:
            state = assign({}, state, {
                pantsId: action.state
            });
            break;
        case SET_PANTS_BRAND:
            state = assign({}, state, {
                pantsBrand: action.state
            });
            break;
        case SET_PANTS_COLOR:
            state = assign({}, state, {
                pantsColor: action.state
            });
            break;
        case SET_PANTS_NAME:
            state = assign({}, state, {
                pantsName: action.state
            });
            break;
        case SET_PANTS_STYLE:
            state = assign({}, state, {
                pantsStyle: action.state
            });
            break;
        case SET_PANTS_WEAR_COUNT:
            state = assign({}, state, {
                pantsWearCount: action.state
            });
            break;
        case SET_PANTS_WEAR_LIMIT:
            state = assign({}, state, {
                pantsWearLimit: action.state
            });
            break;
        case SET_PANTS_LAST_WORN_DATE:
            state = assign({}, state, {
                pantsLastWornDate: action.state
            });
            break;
        case UPDATE_PANTS:
            break;
        default:
            return state;
    }

    return state;
}
