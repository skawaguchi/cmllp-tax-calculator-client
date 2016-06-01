import test from 'tape';
import Chance from 'chance';

import CalculationType from '../../../../src/state/types/calculation';

let chance;

function setup() {
    chance = new Chance();
}

function getFakeCalculation() {
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

test('Calculation Type', (t) => {

    setup();

    t.equal(CalculationType.meta.name, 'Calculation', 'should have a type name');

    t.test('Structure', (st) => {

        st.plan(8);

        const fakeCalculation = getFakeCalculation();

        const calculation = CalculationType(fakeCalculation);

        st.equal(calculation.capitalGains, fakeCalculation.capitalGains, 'should match the capital gains');

        st.equal(calculation.eligibleDividends, fakeCalculation.eligibleDividends, 'should match the eligible dividends');

        st.equal(calculation.ineligibleDividends, fakeCalculation.ineligibleDividends, 'should match the ineligible dividends');

        st.equal(calculation.normalIncome, fakeCalculation.normalIncome, 'should match the normal income');

        st.equal(calculation.province, fakeCalculation.province, 'should match the province');

        st.equal(calculation.rrspContributions, fakeCalculation.rrspContributions, 'should match the rrsp contributions');

        st.equal(calculation.taxesAlreadyPaid, fakeCalculation.taxesAlreadyPaid, 'should match the taxes already paid');

        st.equal(calculation.year, fakeCalculation.year, 'should match the year');

        st.end();

    });

});
