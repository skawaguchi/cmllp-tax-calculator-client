import * as ReactRouter from 'react-router';
import Chance from 'chance';
import sinon from 'sinon';
import test from 'ava';

import * as actionCreators from '../../../src/actions/action-creators';

let sandbox,
    chance;

test.before(() => {
    chance = new Chance();
    sandbox = sinon.sandbox.create();

    // browserHistory doesn't exist in a shallow rest harness because it
    // requires a DOM. So we need to resort to this.
    ReactRouter.browserHistory = {
        push: sandbox.spy()
    };
});

test.after('Cleanup', () => {
    sandbox.restore();
});

/* eslint-disable max-statements */

test('should dispatch the input changed action', (t) => {

    const fakeDispatch = sandbox.spy();
    const fakeID = chance.hash({length: 3});
    const fakeValue = chance.floating();

    actionCreators.changeInput(fakeID, fakeValue)(fakeDispatch);

    const callerArguments = fakeDispatch.firstCall.args[0];

    t.is(callerArguments.id, fakeID);
    t.is(callerArguments.type, 'INPUT_CHANGED');
    t.is(callerArguments.value, fakeValue);

});

test('should dispatch the province changed action', (t) => {

    const fakeDispatch = sandbox.spy();
    const fakeValue = chance.province();

    actionCreators.setProvince(fakeValue)(fakeDispatch);

    const callerArguments = fakeDispatch.firstCall.args[0];

    t.is(callerArguments.type, 'PROVINCE_CHANGED');
    t.is(callerArguments.province, fakeValue);
    t.is(ReactRouter.browserHistory.push.firstCall.args[0], `/tax-calculator/${fakeValue}`);

});
