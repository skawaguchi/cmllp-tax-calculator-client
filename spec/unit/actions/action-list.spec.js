import test from 'tape';

import {
    CALCULATION_LOAD_ERROR,
    CALCULATION_LOAD_START,
    CALCULATION_LOADED,
    NORMAL_INCOME_CHANGED
} from '../../../src/actions/action-list';

test('# Action List', (t) => {

    t.equal(CALCULATION_LOAD_ERROR, 'CALCULATION_LOAD_ERROR', 'should have a calculation load error action');
    t.equal(CALCULATION_LOAD_START, 'CALCULATION_LOAD_START', 'should have a calculation loads start action');
    t.equal(CALCULATION_LOADED, 'CALCULATION_LOADED', 'should have a calculation loaded action');
    t.equal(NORMAL_INCOME_CHANGED, 'NORMAL_INCOME_CHANGED', 'should have an action type for handling normal income changes');

    t.end();
});
