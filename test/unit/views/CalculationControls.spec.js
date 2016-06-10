import Chance from 'chance';
import {shallow} from 'enzyme';
import React from 'react';
import sinon from 'sinon';
import test from 'tape';

import {CalculationControls} from '../../../src/views/CalculationControls';
import Input from '../../../src/state/types/inputs';

let sandbox,
    chance;

function setup() {
    chance = new Chance();
    sandbox = sinon.sandbox.create();
}

function teardown() {
    sandbox.restore();
}

/* eslint-disable max-statements */

test('# CalculationControls > Given the control renders', (t) => {

    setup();

    const component = shallow(
        <CalculationControls
            dispatch={() => {}}
            inputs={{}}
            params={{province: 'fake province'}}
        />
    );

    t.equal(component.find('.calculation-controls').length, 1, 'should have  a container for controls');

    teardown();

    t.end();
});

test('# CalculationControls > Input Controls', (t) => {

    setup();

    const fakeInputs = Input({
        capitalGains: chance.floating(),
        eligibleDividends: chance.floating(),
        ineligibleDividends: chance.floating(),
        normalIncome: chance.floating(),
        province: chance.province(),
        rrspContributions: chance.floating(),
        taxesAlreadyPaid: chance.floating(),
        year: chance.year()
    });

    const component = shallow(
        <CalculationControls
            dispatch={() => {}}
            inputs={fakeInputs}
            params={{province: 'fake province'}}
        />
    );

    t.test('## Normal Income Input', (st) => {

        const childComponent = component.find('.normal-income-input');

        st.equal(childComponent.length, 1, 'should have an input');
        st.equal(childComponent.prop('className'), 'normal-income-input', 'should set the className');
        st.equal(childComponent.prop('inputID'), 'normalIncome', 'should set the flag for calculations');
        st.equal(childComponent.prop('inputValue'), fakeInputs.normalIncome, 'should set the value');
        st.equal(childComponent.prop('labelKey'), 'labels.normalIncome', 'should set the key for localized labels');

        st.end();
    });

    t.test('## Capital Gains Input', (st) => {

        const childComponent = component.find('.capital-gains-input');

        st.equal(childComponent.length, 1, 'should have an input');
        st.equal(childComponent.prop('className'), 'capital-gains-input', 'should set the className');
        st.equal(childComponent.prop('inputID'), 'capitalGains', 'should set the flag for calculations');
        st.equal(childComponent.prop('inputValue'), fakeInputs.capitalGains, 'should set the value');
        st.equal(childComponent.prop('labelKey'), 'labels.capitalGains', 'should set the key for localized labels');

        st.end();
    });

    t.test('## Eligible Dividends Input', (st) => {

        const childComponent = component.find('.eligible-dividends-input');

        st.equal(childComponent.length, 1, 'should have an input');
        st.equal(childComponent.prop('className'), 'eligible-dividends-input', 'should set the className');
        st.equal(childComponent.prop('inputID'), 'eligibleDividends', 'should set the flag for calculations');
        st.equal(childComponent.prop('inputValue'), fakeInputs.eligibleDividends, 'should set the value');
        st.equal(childComponent.prop('labelKey'), 'labels.eligibleDividends', 'should set the key for localized labels');

        st.end();
    });

    t.test('## Ineligible Dividends Input', (st) => {

        const childComponent = component.find('.ineligible-dividends-input');

        st.equal(childComponent.length, 1, 'should have an input');
        st.equal(childComponent.prop('className'), 'ineligible-dividends-input', 'should set the className');
        st.equal(childComponent.prop('inputID'), 'ineligibleDividends', 'should set the flag for calculations');
        st.equal(childComponent.prop('inputValue'), fakeInputs.ineligibleDividends, 'should set the value');
        st.equal(childComponent.prop('labelKey'), 'labels.ineligibleDividends', 'should set the key for localized labels');

        st.end();
    });

    t.test('## RRSP Contributions Input', (st) => {

        const childComponent = component.find('.rrsp-contributions-input');

        st.equal(childComponent.length, 1, 'should have an input');
        st.equal(childComponent.prop('className'), 'rrsp-contributions-input', 'should set the className');
        st.equal(childComponent.prop('inputID'), 'rrspContributions', 'should set the flag for calculations');
        st.equal(childComponent.prop('inputValue'), fakeInputs.rrspContributions, 'should set the value');
        st.equal(childComponent.prop('labelKey'), 'labels.rrspContributions', 'should set the key for localized labels');

        st.end();
    });

    t.test('## Taxes Already Paid Input', (st) => {

        const childComponent = component.find('.taxes-already-paid-input');

        st.equal(childComponent.length, 1, 'should have an input');
        st.equal(childComponent.prop('className'), 'taxes-already-paid-input', 'should set the className');
        st.equal(childComponent.prop('inputID'), 'taxesAlreadyPaid', 'should set the flag for calculations');
        st.equal(childComponent.prop('inputValue'), fakeInputs.taxesAlreadyPaid, 'should set the value');
        st.equal(childComponent.prop('labelKey'), 'labels.taxesAlreadyPaid', 'should set the key for localized labels');

        st.end();
    });

    teardown();

    t.end();
});
