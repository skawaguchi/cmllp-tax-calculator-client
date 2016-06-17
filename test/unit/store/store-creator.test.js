import test from 'ava';
import sinon from 'sinon';
import * as redux from 'redux';

import * as storeCreator from '../../../src/store/store-creator';
import DevTools from '../../../src/containers/DevTools';

let sandbox,
    fakeReducer,
    fakeCreatedStore,
    fakeMiddlewareFunction,
    createStoreStub,
    composeSpy,
    devToolsSpy,
    expectedStore;

test.before(() => {
    sandbox = sinon.sandbox.create();
});

test.after(() => {
    sandbox.restore();
});

test('should have a `configureStore` method', (t) => {
    t.is(typeof storeCreator.configureStore, 'function');
});

test.before(() => {
    fakeReducer = (state, action) => ({foo: action});
    fakeCreatedStore = {};
    fakeMiddlewareFunction = () => ({});

    sandbox.stub(redux, 'applyMiddleware')
        .returns(fakeMiddlewareFunction);

    createStoreStub = sandbox.stub(redux, 'createStore')
        .returns(fakeCreatedStore);

    composeSpy = sandbox.spy(redux, 'compose');

    devToolsSpy = sandbox.spy(DevTools, 'instrument');

    expectedStore = storeCreator.configureStore(fakeReducer);
});

test('should call the reducer', (t) => {
    t.deepEqual(createStoreStub.firstCall.args[0], fakeReducer);
});

test('should add the enhancers to the store', (t) => {
    t.is(typeof createStoreStub.firstCall.args[1], 'function');
});

test('should pass the middleware function as an enhancer', (t) => {
    t.deepEqual(composeSpy.firstCall.args[0], fakeMiddlewareFunction);
});

test('should pass the DevTools as an enhancer', (t) => {
    t.is(devToolsSpy.callCount, 1);
});

test('should return a store from a reducer with middleware applied', (t) => {
    t.is(expectedStore, fakeCreatedStore);
});
