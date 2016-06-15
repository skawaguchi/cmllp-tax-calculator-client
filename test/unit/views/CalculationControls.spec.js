import Chance from 'chance';
import {shallow} from 'enzyme';
import React from 'react';
import sinon from 'sinon';
import test from 'tape';

import * as provinceListFactory from '../../../src/factories/province-list';
import {CalculationControls} from '../../../src/views/CalculationControls';
import Input from '../../../src/state/types/inputs';
import * as actionCreators from '../../../src/actions/action-creators';

let sandbox,
    chance;

const suiteName = '# CalculationControls >';

function setup() {
    chance = new Chance();
    sandbox = sinon.sandbox.create();
}

function teardown() {
    sandbox.restore();
}

/* eslint-disable max-statements */

test(`${suiteName} Given the control has rendered and the province param is defined`, (t) => {

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

function setupInputTest() {
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
    const fakeProvinceList = [{}];
    const fakeContext = {
        intl: {
            locale: 'en'
        }
    };

    sandbox.stub(provinceListFactory, 'getProvinceList')
        .returns(fakeProvinceList);

    const component = shallow(
        <CalculationControls
            dispatch={() => {}}
            inputs={fakeInputs}
            params={{province: 'fake province'}}
        />,
        {
            context: fakeContext
        }
    );

    return {
        component,
        fakeProvinceList,
        fakeInputs
    };
}

test(`${suiteName} ## Province Drop-Down`, (t) => {

    const setupItems = setupInputTest();

    const childComponent = setupItems.component.find('CalculationSelect');

    t.equal(childComponent.length, 1, 'should have a select control for the province');
    t.equal(childComponent.prop('labelKey'), 'labels.province', 'should have a label for the selected province');
    t.equal(childComponent.prop('selectID'), 'province-select-control', 'should have an id for the select controls so that the label will be connected to it');
    t.deepEqual(childComponent.prop('options'), setupItems.fakeProvinceList, 'should have a list of options');
    t.equal(typeof childComponent.prop('changeHandler'), 'function', 'should have a change handler');

    teardown();

    t.end();

});

test('## Province Drop-Down > when the province is changed', (t) => {
    const setupItems = setupInputTest();

    const childComponent = setupItems.component.find('CalculationSelect');
    const calculationsStub = sandbox.stub(actionCreators, 'getCalculations');
    const provinceStub = sandbox.stub(actionCreators, 'setProvince');

    t.equal(calculationsStub.callCount, 0, 'should not have called calculations');
    t.equal(provinceStub.callCount, 0, 'should not have called change province');

    childComponent.prop('changeHandler')();

    t.equal(calculationsStub.callCount, 1, 'should update the calculations');
    t.equal(provinceStub.callCount, 1, 'should update the province');

    teardown();

    t.end();

});

function testInput(t, selector, key) {
    const setupItems = setupInputTest();

    const childComponent = setupItems.component.find(`.${selector}`);

    t.equal(childComponent.length, 1, 'should have an input');
    t.equal(childComponent.prop('className'), selector, 'should set the className');
    t.equal(childComponent.prop('inputID'), key, 'should set the flag for calculations');
    t.equal(childComponent.prop('inputValue'), setupItems.fakeInputs[key], 'should set the value');
    t.equal(childComponent.prop('labelKey'), `labels.${key}`, 'should set the key for localized labels');

    teardown();

    t.end();
}

test(`${suiteName} Normal Income Input`, (t) => {
    testInput(t, 'normal-income-input', 'normalIncome');
});

test(`${suiteName} Capital Gains Input`, (t) => {
    testInput(t, 'capital-gains-input', 'capitalGains');
});

test(`${suiteName} > Eligible Dividends Input`, (t) => {
    testInput(t, 'eligible-dividends-input', 'eligibleDividends');
});

test(`${suiteName} > Ineligible Dividends Input`, (t) => {
    testInput(t, 'ineligible-dividends-input', 'ineligibleDividends');
});

test(`${suiteName} > RRSP Contributions Input`, (t) => {
    testInput(t, 'rrsp-contributions-input', 'rrspContributions');
});

test(`${suiteName} > Taxes Already Paid Input`, (t) => {
    testInput(t, 'taxes-already-paid-input', 'taxesAlreadyPaid');
});

function testInputChange(t, selector) {
    const setupItems = setupInputTest();

    const childComponent = setupItems.component.find(selector);
    const fakeDispatch = sandbox.spy();
    const fakeValue = chance.floating();

    const calculationsStub = sandbox.stub(actionCreators, 'getCalculations');
    const inputStub = sandbox.stub(actionCreators, 'changeInput');

    t.equal(calculationsStub.callCount, 0, 'should not have called calculations');
    t.equal(inputStub.callCount, 0, 'should not have called the input change');

    childComponent.prop('changeHandler')(fakeDispatch, fakeValue);

    t.equal(calculationsStub.callCount, 1, 'should update the calculations');
    t.equal(inputStub.firstCall.args[1], fakeValue, 'should update the input value');

    teardown();

    t.end();
}

test(`${suiteName} Normal Income Input > when the input is changed`, (t) => {
    testInputChange(t, '.normal-income-input');
});

test(`${suiteName} Capital Gains Input > when the input is changed`, (t) => {
    testInputChange(t, '.capital-gains-input');
});

test(`${suiteName} Eligible Dividends Input > when the input is changed`, (t) => {
    testInputChange(t, '.normal-income-input');
});

test(`${suiteName} Ineligible Dividends Input > when the input is changed`, (t) => {
    testInputChange(t, '.capital-gains-input');
});

test(`${suiteName} RRSP Contributions Input > when the input is changed`, (t) => {
    testInputChange(t, '.rrsp-contributions-input');
});

test(`${suiteName} Taxes Already Paid Input > when the input is changed`, (t) => {
    testInputChange(t, '.taxes-already-paid-input');
});
