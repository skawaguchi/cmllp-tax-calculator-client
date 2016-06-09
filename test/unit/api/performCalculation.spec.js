import 'isomorphic-fetch';
import sinon from 'sinon';
import test from 'tape';

import {performCalculation} from '../../../src/api/performCalculation';

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

    /* eslint-disable no-native-reassign */
    fetch = sandbox.stub().returns({
        then: () => ({
            catch: () => ({})
        })
    });

    performCalculation(fakePayload);

    t.equal(fetch.firstCall.args[0], 'https://cmllp-tax-calculator-api.herokuapp.com/calculations?some=payload', 'should append the payload to the service url');

    teardown();

    t.end();
});
