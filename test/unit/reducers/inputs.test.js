import Chance from 'chance';
import test from 'ava';

import {getDefaultState} from '../../../src/state/state';
import inputsReducer from '../../../src/reducers/inputs';

let chance;

test.before(() => {
    chance = new Chance();
});

test('should return the default state', (t) => {
    const previousState = undefined;
    const expectedState = getDefaultState().inputs;
    const returnedState = inputsReducer(previousState, {});

    t.deepEqual(returnedState, expectedState);
});

test('should pass through the provided state', (t) => {
    const nonExistentAction = '_NON_EXISTENT_ACTION';
    const initialState = {};
    const returnedState = inputsReducer(initialState, {type: nonExistentAction});

    t.deepEqual(returnedState, initialState);
});

test('should set the normal income', (t) => {
    const expectedValue = chance.floating();
    const initialState = getDefaultState().inputs;
    const fakeAction = {
        id: 'normalIncome',
        type: 'INPUT_CHANGED',
        value: expectedValue
    };
    const returnedState = inputsReducer(initialState, fakeAction);

    t.is(returnedState.normalIncome, expectedValue);
});

test('should set the province', (t) => {
    const expectedValue = chance.province();
    const initialState = getDefaultState().inputs;
    const fakeAction = {
        isString: true,
        type: 'PROVINCE_CHANGED',
        province: expectedValue
    };
    const returnedState = inputsReducer(initialState, fakeAction);

    t.is(returnedState.province, expectedValue);
});

test('should set the year', (t) => {
    const expectedValue = chance.year();
    const initialState = getDefaultState().inputs;
    const fakeAction = {
        id: 'year',
        isString: true,
        type: 'INPUT_CHANGED',
        value: expectedValue
    };
    const returnedState = inputsReducer(initialState, fakeAction);

    t.is(returnedState.year, expectedValue);
});
