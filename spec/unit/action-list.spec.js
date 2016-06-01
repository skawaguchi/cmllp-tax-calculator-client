import test from 'tape';

import * as actions from '../../src/action-list';

test('# Action List', (t) => {

    t.equal(actions.CALCULATION_LOADED, 'CALCULATION_LOADED', 'should have a calculation loaded action');

    t.end();
});
