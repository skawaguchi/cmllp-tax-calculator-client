import * as ReactRouter from 'react-router';
import Chance from 'chance';
import sinon from 'sinon';
import test from 'ava';

import * as performCalculationService from '../../../src/api/perform-calculation';
import * as actionCreators from '../../../src/actions/action-creators';

let sandbox,
    chance;

test.beforeEach(() => {
    chance = new Chance();
    sandbox = sinon.sandbox.create();

    // browserHistory doesn't exist in a shallow rest harness because it
    // requires a DOM. So we need to resort to this.
    ReactRouter.browserHistory = {
        push: sandbox.spy()
    };
});

test.afterEach.always('cleanup', () => {
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

test('should dispatch the year changed action', (t) => {

    const fakeDispatch = sandbox.spy();
    const fakeValue = chance.year();

    actionCreators.setYear(fakeValue)(fakeDispatch);

    const callerArguments = fakeDispatch.firstCall.args[0];

    t.is(callerArguments.type, 'YEAR_CHANGED');
    t.is(callerArguments.year, fakeValue);

});

test.serial('should get the calculations', async function (t) {
    const fakeDispatch = sandbox.spy();
    const fakeState = {};
    const fakeCalculations = {};
    const fakeGetState = () => fakeState;
    const fakeResponse = {
        json: () => Promise.resolve(fakeCalculations),
        ok: true
    };

    sandbox.stub(performCalculationService, 'performCalculation')
        .returns(Promise.resolve(fakeResponse));

    t.is(fakeDispatch.callCount, 0);

    await actionCreators.getCalculations()(fakeDispatch, fakeGetState);
    t.is(fakeDispatch.callCount, 1);
    t.deepEqual(fakeDispatch.lastCall.args[0], {
        calculations: fakeCalculations,
        type: 'CALCULATION_LOADED'
    });
});

test.serial('should throw an error when the calculations fail', async function (t) {
    const fakeDispatch = () => {};
    const fakeState = {};
    const fakeGetState = () => fakeState;
    const fakeError = 'fake error';

    sandbox.stub(performCalculationService, 'performCalculation')
        .returns(Promise.reject(fakeError));

    const reason = await t.throws(actionCreators.getCalculations()(fakeDispatch, fakeGetState));

    t.is(reason, fakeError);
});

test.serial('should throw an error when the calculation request fails', async function (t) {
    const fakeDispatch = () => {};
    const fakeState = {};
    const fakeGetState = () => fakeState;
    const fakeResponse = {
        ok: false
    };

    sandbox.stub(performCalculationService, 'performCalculation')
        .returns(Promise.resolve(fakeResponse));

    const reason = await t.throws(actionCreators.getCalculations()(fakeDispatch, fakeGetState));

    t.is(reason, new Error('Calculation request failed.'));
});

