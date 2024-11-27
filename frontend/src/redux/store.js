import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk'; // Use named import for thunk
import rootReducer from './rootReducers';

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

export default store;
