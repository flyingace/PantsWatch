import { combineReducers } from 'redux';
import pantsListReducer from './PantsListReducer';
import formReducer from './FormReducer';
import detailReducer from './DetailReducer';

const rootReducer = combineReducers({
    // routing,
    pantsListReducer,
    formReducer,
    detailReducer
});

export default rootReducer;
