import test from 'tape';
import Chance from 'chance';

import inputsType from '../../../../src/state/types/inputs';

let chance;

function setup() {
    chance = new Chance();
}

function getFakeInputs() {
    return {
        capitalGains: chance.floating(),
        eligibleDividends: chance.floating(),
        ineligibleDividends: chance.floating(),
        normalIncome: chance.floating(),
        province: chance.province(),
        rrspContributions: chance.floating(),
        taxesAlreadyPaid: chance.floating(),
        year: chance.year()
    };
}

/* eslint-disable max-statements, no-magic-numbers */
test('# Inputs Type', (t) => {

    setup();

    t.equal(inputsType.meta.name, 'Inputs', 'should have a type name');

    t.test('# Calculation Type > Structure', (st) => {

        st.plan(8);

        const fakeInputs = getFakeInputs();

        const inputs = inputsType(fakeInputs);

        st.equal(inputs.capitalGains, fakeInputs.capitalGains, 'should match the capital gains');

        st.equal(inputs.eligibleDividends, fakeInputs.eligibleDividends, 'should match the eligible dividends');

        st.equal(inputs.ineligibleDividends, fakeInputs.ineligibleDividends, 'should match the ineligible dividends');

        st.equal(inputs.normalIncome, fakeInputs.normalIncome, 'should match the normal income');

        st.equal(inputs.province, fakeInputs.province, 'should match the province');

        st.equal(inputs.rrspContributions, fakeInputs.rrspContributions, 'should match the rrsp contributions');

        st.equal(inputs.taxesAlreadyPaid, fakeInputs.taxesAlreadyPaid, 'should match the taxes already paid');

        st.equal(inputs.year, fakeInputs.year, 'should match the year');

        st.end();

    });

});
