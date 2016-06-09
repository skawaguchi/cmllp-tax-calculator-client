import Chance from 'chance';
import test from 'tape';

import {getDefaultState} from '../../../src/state/state';
import inputsReducer from '../../../src/reducers/inputs';

const suiteName = '# Inputs Reducer >';

let chance;

function setup() {
    chance = new Chance();
}

test(`${suiteName} Given the provided state is undefined`, (t) => {
    const previousState = undefined;
    const expectedState = getDefaultState().inputs;
    const returnedState = inputsReducer(previousState, {});

    t.deepEqual(returnedState, expectedState, 'should return the default state');

    t.end();
});

test(`${suiteName} Given the provided action has no matching handler`, (t) => {
    const nonExistentAction = '_NON_EXISTENT_ACTION';
    const initialState = {};
    const returnedState = inputsReducer(initialState, {type: nonExistentAction});

    t.deepEqual(returnedState, initialState, 'should pass through the provided state');

    t.end();
});

test(`${suiteName} Given the provided action is CALCULATION_LOADED`, (t) => {

    setup();

    const expectedValue = chance.floating();
    const initialState = getDefaultState().inputs;
    const fakeAction = {
        id: 'normalIncome',
        type: 'NORMAL_INCOME_CHANGED',
        value: expectedValue
    };
    const returnedState = inputsReducer(initialState, fakeAction);

    t.deepEqual(returnedState.normalIncome, expectedValue, 'should set the normal income');

    t.end();
});

test(`${suiteName} Given the provided action is PROVINCE_CHANGED`, (t) => {

    setup();

    const expectedValue = chance.province();
    const initialState = getDefaultState().inputs;
    const fakeAction = {
        province: expectedValue,
        type: 'PROVINCE_CHANGED'
    };
    const returnedState = inputsReducer(initialState, fakeAction);

    t.deepEqual(returnedState.province, expectedValue, 'should set the province');

    t.end();
});

test(`${suiteName} Given the provided action is YEAR_CHANGED`, (t) => {

    setup();

    const expectedValue = chance.year();
    const initialState = getDefaultState().inputs;
    const fakeAction = {
        year: expectedValue,
        type: 'YEAR_CHANGED'
    };
    const returnedState = inputsReducer(initialState, fakeAction);

    t.deepEqual(returnedState.year, expectedValue, 'should set the year');

    t.end();
});
