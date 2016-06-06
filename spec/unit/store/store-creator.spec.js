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

/* eslint-disable max-statements */
test('# Store Creator', (t) => {

    t.equals(typeof storeCreator.configureStore, 'function', 'should have a `configureStore` method');

    const fakeReducer = (state, action) => ({foo: action});
    const fakeCreatedStore = {};
    const fakeMiddlewareFunction = () => ({});

    setup();

    sandbox.stub(redux, 'applyMiddleware')
        .returns(fakeMiddlewareFunction);

    const stub = sandbox.stub(redux, 'createStore')
        .returns(fakeCreatedStore);

    const expectedStore = storeCreator.configureStore(fakeReducer);

    t.deepEqual(stub.firstCall.args[0], fakeReducer, 'should call the reducer');
    t.deepEqual(stub.firstCall.args[1], fakeMiddlewareFunction, 'should call the middleware function');

    t.equals(expectedStore, fakeCreatedStore, 'should return a store from a reducer with middleware applied');

    teardown(t);

});
