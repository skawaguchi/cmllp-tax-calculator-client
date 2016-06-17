import sinon from 'sinon';
import test from 'ava';
import * as redux from 'redux';

import calculations from '../../../src/reducers/calculations';
import inputs from '../../../src/reducers/inputs';
import {getCombinedReducer} from '../../../src/reducers/index';

let sandbox;

test.before(() => {
    sandbox = sinon.sandbox.create();
});

test.after(() => {
    sandbox.restore();
});

test('should get the combined reducers', (t) => {
    const stub = sandbox.stub(redux, 'combineReducers');

    getCombinedReducer();

    t.deepEqual(stub.firstCall.args[0], {
        calculations,
        inputs
    });
});
