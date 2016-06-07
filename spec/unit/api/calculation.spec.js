import 'isomorphic-fetch';
import Chance from 'chance';
import sinon from 'sinon';
import test from 'tape';

import * as calculationResources from '../../../src/api/calculation';

let sandbox;

function setup() {
    sandbox = sinon.sandbox.create();
}

function teardown() {
    sandbox.restore();
}

test('# Calculation Resources', (t) => {

    const fakePayload = {some: 'payload'};

    setup();

    fetch = sandbox.stub().returns({
        then: () => ({
            catch: () => ({})
        })
    });

    calculationResources.getCalculation(fakePayload);

    t.equal(fetch.firstCall.args[0], `https://cmllp-tax-calculator-api.herokuapp.com/calculations?some=payload`);

    teardown();

    t.end();
});
