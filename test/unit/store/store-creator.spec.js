import test from 'tape';
import sinon from 'sinon';
import * as redux from 'redux';

import * as storeCreator from '../../../src/store/store-creator';
import DevTools from '../../../src/containers/DevTools';

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

    const createStoreStub = sandbox.stub(redux, 'createStore')
        .returns(fakeCreatedStore);

    const composeSpy = sandbox.spy(redux, 'compose');

    const devToolsSpy = sandbox.spy(DevTools, 'instrument');

    const expectedStore = storeCreator.configureStore(fakeReducer);

    t.deepEqual(createStoreStub.firstCall.args[0], fakeReducer, 'should call the reducer');
    t.equal(typeof createStoreStub.firstCall.args[1], 'function', 'should add the enhancers to the store');
    t.deepEqual(composeSpy.firstCall.args[0], fakeMiddlewareFunction, 'should pass the middleware function as an enhancer');
    t.equal(devToolsSpy.callCount, 1, 'should pass the DevTools as an enhancer');

    t.equals(expectedStore, fakeCreatedStore, 'should return a store from a reducer with middleware applied');

    teardown(t);

});
