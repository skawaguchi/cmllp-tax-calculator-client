import test from 'tape';
import sinon from 'sinon';
import * as redux from 'redux';
// import thunk from 'redux-thunk';
// import Chance from 'chance';

import * as storeCreator from '../../../src/store/store-creator';

let sandbox;

const setup = () => {
    sandbox = sinon.sandbox.create();
};

const teardown = (t) => {
    sandbox.restore();
    t.end();
};

test('# store-creator', (t) => {

    t.test('should have a `createStore` method', (st) => {
        st.equals(typeof storeCreator.createStore, 'function', 'is a function');
        st.end();
    });

    t.test('should return a store from a reducer with middleware applied', (st) => {
        const fakeReducer = (state, action) => ({foo: action.bar});
        const fakeCreatedStore = {};
        const fakeMiddlewareFunction = () => ({});

        setup();

        sandbox.stub(redux, 'applyMiddleware')
            .returns(fakeMiddlewareFunction);

        sandbox.stub(redux, 'createStore')
            .returns(fakeCreatedStore);

        const expectedStore = storeCreator.createStore(fakeReducer);

        sinon.assert.calledWithExactly(redux.createStore, fakeReducer, fakeMiddlewareFunction);

        st.equals(expectedStore, fakeCreatedStore, 'store is returned');

        teardown(st);
    });

});
