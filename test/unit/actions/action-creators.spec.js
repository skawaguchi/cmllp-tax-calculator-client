import Chance from 'chance';
import sinon from 'sinon';
import test from 'tape';

import * as actionCreators from '../../../src/actions/action-creators';

let sandbox,
    chance;

function setup() {
    chance = new Chance();
    sandbox = sinon.sandbox.create();
}

function teardown() {
    sandbox.restore();
}

/* eslint-disable max-statements */

test('# Action Creator: Change Input', (t) => {

    setup();

    const fakeDispatch = sandbox.spy();
    const fakeID = chance.hash({length: 3});
    const fakeValue = chance.floating();

    actionCreators.changeInput(fakeID, fakeValue)(fakeDispatch);

    const callerArguments = fakeDispatch.firstCall.args[0];

    t.equal(callerArguments.id, fakeID, 'should call the dispatch function with the id');
    t.equal(callerArguments.type, 'INPUT_CHANGED', 'should call the dispatch function with the normal income changed type');
    t.equal(callerArguments.value, fakeValue, 'should call the dispatch function with the value');

    teardown();

    t.end();

});

test('# Action Creator: Change Province', (t) => {

    setup();

    const fakeDispatch = sandbox.spy();
    const fakeValue = chance.province();

    actionCreators.setProvince(fakeValue)(fakeDispatch);

    const callerArguments = fakeDispatch.firstCall.args[0];

    t.equal(callerArguments.type, 'PROVINCE_CHANGED', 'should call the dispatch function with the normal income changed type');
    t.equal(callerArguments.province, fakeValue, 'should call the dispatch function with the value');

    teardown();

    t.end();

});
