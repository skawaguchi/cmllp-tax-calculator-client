import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import DevTools from '../containers/DevTools';

export function configureStore(reducer) {

    const enhancer = compose(
        applyMiddleware(thunk),
        DevTools.instrument()
    );

    return createStore(
        reducer,
        enhancer
    );
}
