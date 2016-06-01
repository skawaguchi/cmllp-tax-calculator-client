import Chance from 'chance';
import test from 'tape';

import {getDefaultState} from '../../../src/state/state';
import calculationReducer from '../../../src/reducers/calculations';
import {CALCULATION_LOADED} from '../../../src/actions/action-list';

function getFakeCalcuation() {
    const chance = new Chance();

    return {
        capitalGains: chance.floating(),
        eligibleDividends: chance.floating(),
        ineligibleDividends: chance.floating(),
        province: chance.province(),
        normalIncome: chance.floating(),
        rrspContributions: chance.floating(),
        taxesAlreadyPaid: chance.floating(),
        year: chance.year().toString()
    };
}

const suiteName = '# Calculations Reducer >';

test(`${suiteName} Given the provided state is undefined`, (t) => {
    const previousState = undefined;
    const expectedState = getDefaultState().calculation;
    const returnedState = calculationReducer(previousState, {});

    t.deepEqual(returnedState, expectedState, 'should return the default state');

    t.end();
});

test(`${suiteName} Given the provided action has no handler`, (t) => {
    const nonExistentAction = '_NON_EXISTENT_ACTION';
    const initialState = {};
    const returnedState = calculationReducer(initialState, {type: nonExistentAction});

    t.deepEqual(returnedState, initialState, 'should pass through the provided state');

    t.end();
});

test(`${suiteName} Given the provided action is CALCULATION_LOADED`, (t) => {
    const initialState = {};
    const expectedState = getFakeCalcuation();
    const fakeAction = {
        calculation: expectedState,
        type: CALCULATION_LOADED
    };
    const returnedState = calculationReducer(initialState, fakeAction);

    t.deepEqual(returnedState, expectedState, 'should set state to the provided value');

    t.end();
});
