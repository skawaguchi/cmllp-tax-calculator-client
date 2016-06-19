import * as fetchService from '../../../src/services/fetch';
import sinon from 'sinon';
import test from 'ava';

import {performCalculation} from '../../../src/api/perform-calculation';

let sandbox;

test.beforeEach(() => {
    sandbox = sinon.sandbox.create();
});

test.afterEach(() => {
    sandbox.restore();
});

test('should make the service call', (t) => {

    const fakePayload = {some: 'payload'};

    sandbox.stub(fetchService, 'fetch');

    performCalculation(fakePayload);

    const stubArg = fetchService.fetch.firstCall.args[0];
    const expectedURL = 'https://cmllp-tax-calculator-api.herokuapp.com/calculations?some=payload';

    t.is(stubArg, expectedURL);
});

test('should make the service call with no parameters if no payload is defined', (t) => {

    const fakePayload = null;

    sandbox.stub(fetchService, 'fetch');

    performCalculation(fakePayload);

    const stubArg = fetchService.fetch.firstCall.args[0];
    const expectedURL = 'https://cmllp-tax-calculator-api.herokuapp.com/calculations';

    t.is(stubArg, expectedURL);
});
