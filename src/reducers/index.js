/*globals */

import { combineReducers } from 'redux';
import pantsListReducer from './PantsListReducer';
import formReducer from './FormReducer';

const rootReducer = combineReducers({
    // routing,
    pantsListReducer,
    formReducer
});

export default rootReducer;
