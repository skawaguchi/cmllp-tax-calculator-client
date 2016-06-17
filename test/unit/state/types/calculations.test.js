import test from 'ava';
import Chance from 'chance';

import calculationsType from '../../../../src/state/types/calculations';

let chance,
    fakeCalculations,
    calculations;

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

test.before(() => {
    chance = new Chance();
});

test('should have a type name', (t) => {
    t.is(calculationsType.meta.name, 'Calculations');
});

test.before(() => {
    fakeCalculations = getFakeCalculations();
    calculations = calculationsType(fakeCalculations);
});

test('should match the average tax rate', (t) => {
    t.is(calculations.averageTaxRate, fakeCalculations.averageTaxRate);
});

test('should match the federal eligible dividend tax credit', (t) => {
    t.is(calculations.federalEligibleDividendTaxCredit, fakeCalculations.federalEligibleDividendTaxCredit);
});

test('should match the federal ineligible dividend tax credit', (t) => {
    t.is(calculations.federalIneligibleDividendTaxCredit, fakeCalculations.federalIneligibleDividendTaxCredit);
});

test('should match the income after taxes', (t) => {
    t.is(calculations.incomeAfterTaxes, fakeCalculations.incomeAfterTaxes);
});

test('should match the marginal tax rate', (t) => {
    t.is(calculations.marginalTaxRate, fakeCalculations.marginalTaxRate);
});

test('should match the net tax payable', (t) => {
    t.is(calculations.netTaxPayable, fakeCalculations.netTaxPayable);
});

test('should match the provincial eligible dividend tax credit', (t) => {
    t.is(calculations.provincialEligibleDividendTaxCredit, fakeCalculations.provincialEligibleDividendTaxCredit);
});

test('should match the provincial ineligible dividend tax credit', (t) => {
    t.is(calculations.provincialIneligibleDividendTaxCredit, fakeCalculations.provincialIneligibleDividendTaxCredit);
});

test('should match the taxable dividends', (t) => {
    t.is(calculations.taxableDividends, fakeCalculations.taxableDividends);
});

test('should match the taxable normal income', (t) => {
    t.is(calculations.taxableNormalIncome, fakeCalculations.taxableNormalIncome);
});

test('should match the total overall taxes', (t) => {
    t.is(calculations.totalOverallTaxes, fakeCalculations.totalOverallTaxes);
});

test('should match the total taxable income', (t) => {
    t.is(calculations.totalTaxableIncome, fakeCalculations.totalTaxableIncome);
});

test('should match the total tax credits', (t) => {
    t.is(calculations.totalTaxCredits, fakeCalculations.totalTaxCredits);
});

test('should match the total taxes', (t) => {
    t.is(calculations.totalTaxes, fakeCalculations.totalTaxes);
});
