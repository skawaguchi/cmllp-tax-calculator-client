import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

export function configureStore(reducer) {
    const middleWare = [thunk];

    return createStore(
        reducer,
        applyMiddleware(...middleWare)
    );
}
