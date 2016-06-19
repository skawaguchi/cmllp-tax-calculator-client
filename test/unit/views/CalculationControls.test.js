import Chance from 'chance';
import {shallow, mount} from 'enzyme';
import React from 'react';
import sinon from 'sinon';
import test from 'ava';

import {intlShape} from 'react-intl';
import '../../utils/dom-setup';
import {fn as momentService} from 'moment';

import * as provinceListFactory from '../../../src/factories/province-list';
import {CalculationControls} from '../../../src/views/CalculationControls';
import Input from '../../../src/state/types/inputs';
import * as actionCreators from '../../../src/actions/action-creators';

let sandbox,
    chance,
    component,
    childComponent,
    testItems,
    calculationsStub,
    inputsStub;

function getFakeIntl() {
    return {
        formatDate: () => {},
        formatHTMLMessage: () => {},
        formatNumber: () => {},
        formatPlural: () => {},
        formatRelative: () => {},
        formatTime: () => {},
        now: () => {},
        formatMessage: () => {},
        locale: 'en'
    }
}

test.beforeEach(() => {
    chance = new Chance();
    sandbox = sinon.sandbox.create();
});

test.afterEach(() => {
    sandbox.restore();
});

test('should render the component', (t) => {
    component = shallow(
        <CalculationControls
            dispatch={() => {}}
            inputs={{}}
            params={{province: 'fake province'}}
        />
    );

    t.is(component.find('.calculation-controls').length, 1);
});

test('should update the province and year in the store', (t) => {

    const provinceStub = sandbox.stub(actionCreators, 'setProvince');
    const yearStub = sandbox.stub(actionCreators, 'setYear');
    const fakeYear = chance.year();

    sandbox.stub(momentService, 'format')
        .returns(fakeYear);

    const fakeIntl = getFakeIntl();
    const fakeContext = {
        intl: fakeIntl
    };
    const fakeProvince = chance.province();

    component = mount(
        <CalculationControls
            dispatch={() => {}}
            inputs={{}}
            params={{province: fakeProvince}}
        />,
        {
            context: fakeContext
        }
    );

    t.is(provinceStub.firstCall.args[0], fakeProvince);
    t.is(yearStub.firstCall.args[0], fakeYear);
});

function setupInputTest() {

    const fakeInputs = Input({
        capitalGains: 1000,
        eligibleDividends: 1000,
        ineligibleDividends: 1000,
        normalIncome: 1000,
        province: chance.province(),
        rrspContributions: 1000,
        taxesAlreadyPaid: 1000,
        year: chance.year().toString()
    });
    const fakeProvinceList = [{}];
    const fakeContext = {
        intl: intlShape({
            locale: 'en'
        })
    };

    sandbox.stub(provinceListFactory, 'getProvinceList')
        .returns(fakeProvinceList);

    calculationsStub = sandbox.stub(actionCreators, 'getCalculations');

    inputsStub = sandbox.stub(actionCreators, 'changeInput');

    component = shallow(
        <CalculationControls
            dispatch={sandbox.spy()}
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

test('should have a select control for the province', (t) => {
    testItems = setupInputTest();
    childComponent = testItems.component.find('CalculationSelect');

    t.is(childComponent.length, 1);
    t.is(childComponent.prop('labelKey'), 'labels.province');
    t.is(childComponent.prop('selectID'), 'province-select-control');
    t.deepEqual(childComponent.prop('options'), testItems.fakeProvinceList);
    t.is(typeof childComponent.prop('changeHandler'), 'function');
});

test('should call action creators when the province is changed', (t) => {
    testItems = setupInputTest();
    childComponent = testItems.component.find('CalculationSelect');

    const provinceStub = sandbox.stub(actionCreators, 'setProvince');

    t.is(calculationsStub.callCount, 0);
    t.is(provinceStub.callCount, 0);

    childComponent.prop('changeHandler')();

    t.is(calculationsStub.callCount, 1);
    t.is(provinceStub.callCount, 1);
});

function testInput(t, className, key) {

    childComponent = testItems.component.find(`.${className}`);

    t.is(childComponent.length, 1);
    t.is(childComponent.prop('className'), className);
    t.is(childComponent.prop('inputID'), key);
    t.is(childComponent.prop('inputValue'), testItems.fakeInputs[key]);
    t.is(childComponent.prop('labelKey'), `labels.${key}`);
}

test('should have inputs', (t) => {
    testItems = setupInputTest();

    testInput(t, 'normal-income-input', 'normalIncome');
    testInput(t, 'capital-gains-input', 'capitalGains');
    testInput(t, 'eligible-dividends-input', 'eligibleDividends');
    testInput(t, 'ineligible-dividends-input', 'ineligibleDividends');
    testInput(t, 'rrsp-contributions-input', 'rrspContributions');
    testInput(t, 'taxes-already-paid-input', 'taxesAlreadyPaid');
});

function testInputChange(t, selector) {
    testItems = setupInputTest();

    childComponent = testItems.component.find(selector);

    const fakeDispatch = sandbox.spy();
    const fakeValue = chance.floating();

    t.is(calculationsStub.callCount, 0);
    t.is(inputsStub.callCount, 0);

    childComponent.prop('changeHandler')(fakeDispatch, fakeValue);

    t.is(calculationsStub.callCount, 1);
    t.is(inputsStub.firstCall.args[1], fakeValue);

}

test('should trigger the normal income action', (t) => {
    testInputChange(t, '.normal-income-input');
});

test('should trigger the capital gains action', (t) => {
    testInputChange(t, '.capital-gains-input');
});

test('should trigger the eligible dividends action', (t) => {
    testInputChange(t, '.eligible-dividends-input');
});

test('should trigger the ineligible dividends action', (t) => {
    testInputChange(t, '.ineligible-dividends-input');
});

test('should trigger the rrsp contributions action', (t) => {
    testInputChange(t, '.rrsp-contributions-input');
});

test('should trigger the taxes already paid action', (t) => {
    testInputChange(t, '.taxes-already-paid-input');
});
