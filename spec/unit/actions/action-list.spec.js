import test from 'tape';

import * as actions from '../../../src/actions/action-list';

test('# Action List', (t) => {

    t.equal(actions.CALCULATION_LOAD_ERROR, 'CALCULATION_LOAD_ERROR', 'should have a calculation load error action');
    t.equal(actions.CALCULATION_LOAD_START, 'CALCULATION_LOAD_START', 'should have a calculation loads start action');
    t.equal(actions.CALCULATION_LOADED, 'CALCULATION_LOADED', 'should have a calculation loaded action');

    t.end();
});
