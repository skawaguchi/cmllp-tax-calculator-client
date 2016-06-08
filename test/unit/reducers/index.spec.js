import sinon from 'sinon';
import test from 'tape';
import * as redux from 'redux';

import calculations from '../../../src/reducers/calculations';
import {getCombinedReducer} from '../../../src/reducers/index';

let sandbox;

function setup() {
    sandbox = sinon.sandbox.create();
}

function teardown() {
    sandbox.restore();
}

test('# Combined Reducers', (t) => {
    setup();

    const stub = sandbox.stub(redux, 'combineReducers');

    getCombinedReducer();

    t.deepEqual(stub.firstCall.args[0], {
        calculations
    }, 'should get the combined reducers');

    teardown();

    t.end();
});
