import Chance from 'chance';
import sinon from 'sinon';
import test from 'ava';

import {fn as momentProto} from 'moment';

import State, {getDefaultState} from '../../../src/state/state';

let sandbox,
    chance,
    clock,
    fakeYear,
    expectedState;

test.before(() => {
    chance = new Chance();
    sandbox = sinon.sandbox.create();

    clock = sinon.useFakeTimers();
    fakeYear = chance.year();
    sandbox.stub(momentProto, 'format')
        .returns(fakeYear);

    expectedState = getDefaultState();
});

test.after(() => {
    sandbox.restore();
    clock.restore();
});

test('should have a struct name', (t) => {
    t.is(State.meta.name, 'State');
});

test('should be immutable state', (t) => {
    t.is(State.is(expectedState), true);
});

test('should have average tax rate of 0', (t) => {
    t.is(expectedState.calculations.averageTaxRate, 0);
});

test('should have federal eligible dividend tax credit of 0', (t) => {
    t.is(expectedState.calculations.federalEligibleDividendTaxCredit, 0);
});

test('should have federal ineligible dividend tax credit of 0', (t) => {
    t.is(expectedState.calculations.federalIneligibleDividendTaxCredit, 0);
});

test('should have income after taxes of 0', (t) => {
    t.is(expectedState.calculations.incomeAfterTaxes, 0);
});

test('should have marginal tax rate of 0', (t) => {
    t.is(expectedState.calculations.marginalTaxRate, 0);
});

test('should have net payable of 0', (t) => {
    t.is(expectedState.calculations.netTaxPayable, 0);
});

test('should have provincial eligible dividend tax credit of 0', (t) => {
    t.is(expectedState.calculations.provincialEligibleDividendTaxCredit, 0);
});

test('should have provincial ineligible dividend tax credit of 0', (t) => {
    t.is(expectedState.calculations.provincialIneligibleDividendTaxCredit, 0);

});

test('should have taxable dividends of 0', (t) => {
    t.is(expectedState.calculations.taxableDividends, 0);
});

test('should have taxable normal income of 0', (t) => {
    t.is(expectedState.calculations.taxableNormalIncome, 0);
});

test('should have total overall taxes of 0', (t) => {
    t.is(expectedState.calculations.totalOverallTaxes, 0);
});

test('should have total taxable income of 0', (t) => {
    t.is(expectedState.calculations.totalTaxableIncome, 0);
});

test('should have total tax credits of 0', (t) => {
    t.is(expectedState.calculations.totalTaxCredits, 0);
});

test('should have total taxes of 0', (t) => {
    t.is(expectedState.calculations.totalTaxes, 0);
});

test('should have capital gains of 0', (t) => {
    t.is(expectedState.inputs.capitalGains, 0);
});

test('should have eligible dividends of 0', (t) => {
    t.is(expectedState.inputs.eligibleDividends, 0);
});

test('should have ineligible dividends of 0', (t) => {
    t.is(expectedState.inputs.ineligibleDividends, 0);
});

test('should have normal income of 0', (t) => {
    t.is(expectedState.inputs.normalIncome, 0);
});

test('should have normal income of 0', (t) => {
    t.is(expectedState.inputs.normalIncome, 0);
});
test('should have a province of empty string', (t) => {
    t.is(expectedState.inputs.province, '');
});

test('should have rrsp contributions of 0', (t) => {
    t.is(expectedState.inputs.rrspContributions, 0);
});

test('should have taxes already paid of 0', (t) => {
    t.is(expectedState.inputs.taxesAlreadyPaid, 0);
});

test('should have a year of the current year', (t) => {
    t.is(expectedState.inputs.year, fakeYear);
});
