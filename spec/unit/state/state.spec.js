import tcomb from 'tcomb';
import test from 'tape';
import sinon from 'sinon';

import CalculationType from '../../../src/state/types/calculation';
import State, {getDefaultState} from '../../../src/state/state';

test('# State', (t) => {

    t.equal(State.meta.name, 'State', 'should have a struct name');

    const expectedState = getDefaultState();

    t.equal(State.is(expectedState), true, 'should be immutable state');

    t.test('Given the default state', (st) => {

        st.equal(expectedState.calculation.capitalGains, 0, 'should have capital gains of 0');

        st.equal(expectedState.calculation.capitalGains, 0, 'should have eligible dividends of 0');

        st.equal(expectedState.calculation.capitalGains, 0, 'should have ineligible dividends of 0');

        st.equal(expectedState.calculation.capitalGains, 0, 'should have normal income of 0');

        st.equal(expectedState.calculation.capitalGains, 0, 'should have a province of empty string');

        st.equal(expectedState.calculation.capitalGains, 0, 'should have rrsp contributions of 0');

        st.equal(expectedState.calculation.capitalGains, 0, 'should have taxes already paid of 0');

        st.equal(expectedState.calculation.capitalGains, 0, 'should have a year of empty string');

        st.end();
    });

});
