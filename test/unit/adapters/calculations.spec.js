import Chance from 'chance';
import test from 'tape';

import {adaptCalculations} from '../../../src/adapters/calculations';

let chance;

function setup() {
    chance = new Chance();
}

test('# Calculations Adapters > Normal Income', (t) => {

    setup();

    const fakeValue = chance.floating();
    const originalOtherPropValue = chance.floating();
    const fakeState = {
        normalIncome: 0,
        otherProp: originalOtherPropValue
    };

    const expectedResponse = adaptCalculations(
        'normalIncome',
        fakeValue,
        fakeState
    );

    t.equal(expectedResponse.normalIncome, fakeValue, 'should set the normal income value');
    t.equal(expectedResponse.otherProp, originalOtherPropValue, 'should not touch the other prop');

    t.end();

});
