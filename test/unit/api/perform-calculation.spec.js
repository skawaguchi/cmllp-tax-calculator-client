import * as fetchService from '../../../src/services/fetch';
import sinon from 'sinon';
import test from 'tape';

import {performCalculation} from '../../../src/api/perform-calculation';

let sandbox;

function setup() {
    sandbox = sinon.sandbox.create();
}

function teardown() {
    sandbox.restore();
}

test('# Calculation API', (t) => {

    const fakePayload = {some: 'payload'};

    setup();

    sandbox.stub(fetchService, 'fetch');

    performCalculation(fakePayload);

    t.equal(fetchService.fetch.firstCall.args[0], 'https://cmllp-tax-calculator-api.herokuapp.com/calculations?some=payload', 'should append the payload to the service url');

    teardown();

    t.end();
});
