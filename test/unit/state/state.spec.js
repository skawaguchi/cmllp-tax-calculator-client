import Chance from 'chance';
import sinon from 'sinon';
import test from 'tape';

import {fn as momentProto} from 'moment';

import State, {getDefaultState} from '../../../src/state/state';

let sandbox,
    chance,
    clock;

function setup() {
    chance = new Chance();
    sandbox = sinon.sandbox.create();
    clock = sinon.useFakeTimers();
}

function teardown() {
    sandbox.restore();
    clock.restore();
}

/* eslint-disable max-statements */

test('# State', (t) => {

    setup();

    const fakeYear = chance.year();

    t.equal(State.meta.name, 'State', 'should have a struct name');

    sandbox.stub(momentProto, 'format')
        .returns(fakeYear);

    const expectedState = getDefaultState();

    t.equal(State.is(expectedState), true, 'should be immutable state');

    t.test('# State > Given the default state', (st) => {

        st.equal(expectedState.calculations.incomeAfterTaxes, 0, 'should have income after taxes of 0');

        st.equal(expectedState.calculations.federalEligibleDividendTaxCredit, 0, 'should have federal eligible dividend tax credit of 0');

        st.equal(expectedState.calculations.federalIneligibleDividendTaxCredit, 0, 'should have federal ineligible dividend tax credit of 0');

        st.equal(expectedState.calculations.netTaxPayable, 0, 'should have net payable of 0');

        st.equal(expectedState.calculations.provincialEligibleDividendTaxCredit, 0, 'should have provincial eligible dividend tax credit of 0');

        st.equal(expectedState.calculations.provincialIneligibleDividendTaxCredit, 0, 'should have provincial ineligible dividend tax credit of 0');

        st.equal(expectedState.calculations.taxableDividends, 0, 'should have taxable dividends of 0');

        st.equal(expectedState.calculations.taxableNormalIncome, 0, 'should have taxable normal income of 0');

        st.equal(expectedState.calculations.totalOverallTaxes, 0, 'should have total overall taxes of 0');

        st.equal(expectedState.calculations.totalTaxableIncome, 0, 'should have total taxable income of 0');

        st.equal(expectedState.calculations.totalTaxCredits, 0, 'should have total tax credits of 0');

        st.equal(expectedState.calculations.totalTaxes, 0, 'should have total taxes of 0');

        st.equal(expectedState.inputs.capitalGains, 0, 'should have capital gains of 0');

        st.equal(expectedState.inputs.eligibleDividends, 0, 'should have eligible dividends of 0');

        st.equal(expectedState.inputs.ineligibleDividends, 0, 'should have ineligible dividends of 0');

        st.equal(expectedState.inputs.normalIncome, 0, 'should have normal income of 0');

        st.equal(expectedState.inputs.province, '', 'should have a province of empty string');

        st.equal(expectedState.inputs.rrspContributions, 0, 'should have rrsp contributions of 0');

        st.equal(expectedState.inputs.taxesAlreadyPaid, 0, 'should have taxes already paid of 0');

        st.equal(expectedState.inputs.year, fakeYear, 'should have a year of the current year');

        st.end();
    });

    teardown();

    t.end();
});
