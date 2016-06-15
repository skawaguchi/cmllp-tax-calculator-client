import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import DevTools from '../containers/DevTools';

export function configureStore(reducer) {

    const enhancer = compose(
        applyMiddleware(thunk),
        DevTools.instrument()
    );

    const store = createStore(
        reducer,
        enhancer
    );

    if (module.hot) {
        module.hot.accept('../reducers', () =>
            store.replaceReducer(require('../reducers')/* .default if you use Babel 6+ */)
        );
    }

    return store;
}
