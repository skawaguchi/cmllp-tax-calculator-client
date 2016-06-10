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

    teardown();

    t.end();
});
