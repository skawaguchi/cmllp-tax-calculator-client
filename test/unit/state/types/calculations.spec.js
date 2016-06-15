import test from 'tape';
import Chance from 'chance';

import calculationsType from '../../../../src/state/types/calculations';

let chance;

function setup() {
    chance = new Chance();
}

function getFakeCalculations() {
    return {
        averageTaxRate: chance.floating({min: 0, max: 1}),
        federalEligibleDividendTaxCredit: chance.floating(),
        federalIneligibleDividendTaxCredit: chance.floating(),
        incomeAfterTaxes: chance.floating(),
        marginalTaxRate: chance.floating({min: 0, max: 1}),
        netTaxPayable: chance.floating(),
        provincialEligibleDividendTaxCredit: chance.floating(),
        provincialIneligibleDividendTaxCredit: chance.floating(),
        taxableDividends: chance.floating(),
        taxableNormalIncome: chance.floating(),
        totalOverallTaxes: chance.floating(),
        totalTaxableIncome: chance.floating(),
        totalTaxCredits: chance.floating(),
        totalTaxes: chance.floating()
    };
}

/* eslint-disable max-statements, no-magic-numbers */
test('# Calculations Type', (t) => {

    setup();

    t.equal(calculationsType.meta.name, 'Calculations', 'should have a type name');

    t.test('# Calculations Type > Structure', (st) => {

        st.plan(14);

        const fakeCalculations = getFakeCalculations();

        const calculations = calculationsType(fakeCalculations);

        st.equal(calculations.averageTaxRate, fakeCalculations.averageTaxRate, 'should match the average tax rate');

        st.equal(calculations.federalEligibleDividendTaxCredit, fakeCalculations.federalEligibleDividendTaxCredit, 'should match the federal eligible dividend tax credit');

        st.equal(calculations.federalIneligibleDividendTaxCredit, fakeCalculations.federalIneligibleDividendTaxCredit, 'should match the federal ineligible dividend tax credit');

        st.equal(calculations.incomeAfterTaxes, fakeCalculations.incomeAfterTaxes, 'should match the income after taxes');

        st.equal(calculations.marginalTaxRate, fakeCalculations.marginalTaxRate, 'should match the marginal tax rate');

        st.equal(calculations.netTaxPayable, fakeCalculations.netTaxPayable, 'should match the net tax payable');

        st.equal(calculations.provincialEligibleDividendTaxCredit, fakeCalculations.provincialEligibleDividendTaxCredit, 'should match the provincial eligible dividend tax credit');

        st.equal(calculations.provincialIneligibleDividendTaxCredit, fakeCalculations.provincialIneligibleDividendTaxCredit, 'should match the provincial ineligible dividend tax credit');

        st.equal(calculations.taxableDividends, fakeCalculations.taxableDividends, 'should match the taxable dividends');

        st.equal(calculations.taxableNormalIncome, fakeCalculations.taxableNormalIncome, 'should match the taxable normal income');

        st.equal(calculations.totalOverallTaxes, fakeCalculations.totalOverallTaxes, 'should match the total overall taxes');

        st.equal(calculations.totalTaxableIncome, fakeCalculations.totalTaxableIncome, 'should match the total taxable income');

        st.equal(calculations.totalTaxCredits, fakeCalculations.totalTaxCredits, 'should match the total tax credits');

        st.equal(calculations.totalTaxes, fakeCalculations.totalTaxes, 'should match the total taxes');

        st.end();

    });

});
