/*globals */

import { combineReducers } from 'redux';
// import { routerReducer as routing } from 'react-router-redux';
import PantsListReducer from './PantsListReducer';
import FormReducer from './FormReducer';

const rootReducer = combineReducers({
    // routing,
    PantsListReducer,
    FormReducer
});

export default rootReducer;
