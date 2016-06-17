import Chance from 'chance';
import test from 'ava';

import {getDefaultState} from '../../../src/state/state';
import calculationReducer from '../../../src/reducers/calculations';

function getFakeCalcuations() {
    const chance = new Chance();

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

test('should return the default state', (t) => {
    const previousState = undefined;
    const expectedState = getDefaultState().calculations;
    const returnedState = calculationReducer(previousState, {});

    t.deepEqual(returnedState, expectedState, 'should return the default state');
});

test('should pass through the provided state', (t) => {
    const nonExistentAction = '_NON_EXISTENT_ACTION';
    const initialState = {};
    const returnedState = calculationReducer(initialState, {type: nonExistentAction});

    t.deepEqual(returnedState, initialState);
});

test('should set state to the provided value', (t) => {
    const initialState = {};
    const expectedState = getFakeCalcuations();
    const fakeAction = {
        calculations: expectedState,
        type: 'CALCULATION_LOADED'
    };
    const returnedState = calculationReducer(initialState, fakeAction);

    t.deepEqual(returnedState, expectedState);
});
