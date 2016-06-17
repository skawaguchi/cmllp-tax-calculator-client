import Chance from 'chance';
import {shallow} from 'enzyme';
import React from 'react';
import sinon from 'sinon';
import test from 'ava';

import CalculationSelect from '../../../src/views/CalculationSelect';

let chance,
    sandbox;

function getFakeOption() {
    return {
        labelKey: chance.hash(),
        value: chance.hash()
    };
}

test.before(() => {
    sandbox = sinon.sandbox.create();
    chance = new Chance();
});

test.after(() => {
    sandbox.restore();
});

function setupTest() {
    const fakeChangeHandler = sandbox.stub();
    const fakeSelectID = chance.hash();
    const fakeLabelKey = chance.hash();
    const fakeSelectedValue = chance.string();
    const fakeOptions = [
        getFakeOption(),
        getFakeOption(),
        getFakeOption()
    ];
    const fakeContext = {
        intl: {
            formatMessage: sandbox.stub(),
            locale: 'en'
        }
    };

    const component = shallow(
        <CalculationSelect
            changeHandler={fakeChangeHandler}
            labelKey={fakeLabelKey}
            options={fakeOptions}
            selectID={fakeSelectID}
            selectedValue={fakeSelectedValue}
        />,
        {context: fakeContext}
    );

    return {
        component,
        fakeChangeHandler,
        fakeLabelKey,
        fakeOptions,
        fakeSelectedValue,
        fakeSelectID
    };
}

/* eslint-disable max-statements */
test('should render the component', (t) => {
    const testItems = setupTest();

    t.is(testItems.component.type(), 'div');
    t.is(testItems.component.prop('className'), 'calculation-select');
    t.is(testItems.component.find('label').length, 1);
    t.is(testItems.component.find('select').length, 1);
    t.is(testItems.component.find('select').prop('id'), testItems.fakeSelectID);
    t.is(testItems.component.find('label').prop('htmlFor'), testItems.fakeSelectID);
    t.is(testItems.component.find('label').find('FormattedMessage').length, 1);
    t.is(testItems.component.find('label').find('FormattedMessage').prop('id'), testItems.fakeLabelKey);
    t.is(testItems.component.unrendered.props.changeHandler, testItems.fakeChangeHandler);
    t.is(testItems.component.find('option').length, testItems.fakeOptions.length);
    t.is(testItems.component.unrendered.props.selectedValue, testItems.fakeSelectedValue);
});

test('should dispatch the action when the select is changed', (t) => {
    const testItems = setupTest();

    const fakeValue = chance.string();
    const fakeEvent = {target: {value: fakeValue}};

    testItems.component.find('select').simulate('change', fakeEvent);

    t.is(testItems.fakeChangeHandler.firstCall.args[0], fakeEvent, 'should call with the event');
    t.is(testItems.fakeChangeHandler.firstCall.args[1], fakeValue, 'should call with the value');
});
