import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';

const logger = createLogger();
const enhancer = applyMiddleware(thunk, logger);

export default function configureStore(initialState) {
    return createStore(rootReducer, initialState, enhancer);
}
