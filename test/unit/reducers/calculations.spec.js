import Chance from 'chance';
import test from 'tape';

import {getDefaultState} from '../../../src/state/state';
import calculationReducer from '../../../src/reducers/calculations';

function getFakeCalcuations() {
    const chance = new Chance();

    return {
        incomeAfterTaxes: chance.floating(),
        federalEligibleDividendTaxCredit: chance.floating(),
        federalIneligibleDividendTaxCredit: chance.floating(),
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

const suiteName = '# Calculations Reducer >';

test(`${suiteName} Given the provided state is undefined`, (t) => {
    const previousState = undefined;
    const expectedState = getDefaultState().calculations;
    const returnedState = calculationReducer(previousState, {});

    t.deepEqual(returnedState, expectedState, 'should return the default state');

    t.end();
});

test(`${suiteName} Given the provided action has no matching handler`, (t) => {
    const nonExistentAction = '_NON_EXISTENT_ACTION';
    const initialState = {};
    const returnedState = calculationReducer(initialState, {type: nonExistentAction});

    t.deepEqual(returnedState, initialState, 'should pass through the provided state');

    t.end();
});

test(`${suiteName} Given the provided action is CALCULATION_LOADED`, (t) => {
    const initialState = {};
    const expectedState = getFakeCalcuations();
    const fakeAction = {
        calculations: expectedState,
        type: 'CALCULATION_LOADED'
    };
    const returnedState = calculationReducer(initialState, fakeAction);

    t.deepEqual(returnedState, expectedState, 'should set state to the provided value');

    t.end();
});
