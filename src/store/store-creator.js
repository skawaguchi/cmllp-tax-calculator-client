import {createStore as reduxCreateStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

export function createStore(reducer) {
    return reduxCreateStore(reducer, applyMiddleware(thunk));
}
