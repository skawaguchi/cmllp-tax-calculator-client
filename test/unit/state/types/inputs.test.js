import test from 'ava';
import Chance from 'chance';

import inputsType from '../../../../src/state/types/inputs';

let chance,
    fakeInputs,
    inputs;

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

test.before(() => {
    chance = new Chance();
});

test('should have a type name', (t) => {
    t.is(inputsType.meta.name, 'Inputs');
});

test.before(() => {
    fakeInputs = getFakeInputs();
    inputs = inputsType(fakeInputs);
});

test('should match the capital gains', (t) => {
    t.is(inputs.capitalGains, fakeInputs.capitalGains);
});

test('should match the eligible dividends', (t) => {
    t.is(inputs.eligibleDividends, fakeInputs.eligibleDividends);
});

test('should match the ineligible dividends', (t) => {
    t.is(inputs.ineligibleDividends, fakeInputs.ineligibleDividends);
});

test('should match the normal income', (t) => {
    t.is(inputs.normalIncome, fakeInputs.normalIncome);
});

test('should match the province', (t) => {
    t.is(inputs.province, fakeInputs.province);
});

test('should match the rrsp contributions', (t) => {
    t.is(inputs.rrspContributions, fakeInputs.rrspContributions);
});

test('should match the taxes already paid', (t) => {
    t.is(inputs.taxesAlreadyPaid, fakeInputs.taxesAlreadyPaid);
});

test('should match the year', (t) => {
    t.is(inputs.year, fakeInputs.year);
});
