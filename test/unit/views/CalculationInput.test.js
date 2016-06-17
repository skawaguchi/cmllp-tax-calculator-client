import Chance from 'chance';
import {shallow} from 'enzyme';
import sinon from 'sinon';
import React from 'react';
import test from 'ava';

import CalculationInput from '../../../src/views/CalculationInput';

let chance,
    sandbox;

function setupTests() {
    const fakeChangeHandler = sandbox.stub();
    const fakeClassName = chance.hash({length: 5});
    const fakeInputID = chance.hash({length: 5});
    const fakeLabelKey = chance.hash({length: 3});
    const fakeValue = chance.floating();

    const component = shallow(
        <CalculationInput
            changeHandler={fakeChangeHandler}
            className={fakeClassName}
            inputID={fakeInputID}
            inputValue={fakeValue}
            labelKey={fakeLabelKey}
        />
    );

    return {
        component,
        fakeChangeHandler,
        fakeClassName,
        fakeInputID,
        fakeLabelKey,
        fakeValue
    };
}

test.beforeEach(() => {
    chance = new Chance();
    sandbox = sinon.sandbox.create();
});

test.afterEach(() => {
    sandbox.restore();
});

test('should render the component', (t) => {
    const testItems = setupTests();

    t.is(testItems.component.type(), 'div');
    t.is(testItems.component.find('label FormattedMessage').prop('id'), testItems.fakeLabelKey);

    t.is(testItems.component.unrendered.props.changeHandler, testItems.fakeChangeHandler);
    t.is(testItems.component.prop('className'), `calculation-input ${testItems.fakeClassName}`);
    t.is(testItems.component.unrendered.props.inputID, testItems.fakeInputID);
    t.is(testItems.component.unrendered.props.labelKey, testItems.fakeLabelKey);

    t.is(testItems.component.find('input').prop('type'), 'number');
    t.is(testItems.component.find('input').prop('value'), testItems.fakeValue);
});

test('should call the callback when its changed', (t) => {
    const testItems = setupTests();

    const fakeEvent = {
        target: {
            value: testItems.fakeValue
        }
    };

    testItems.component.find('input').simulate('change', fakeEvent);

    t.is(testItems.fakeChangeHandler.lastCall.args[0], testItems.fakeInputID);
    t.is(testItems.fakeChangeHandler.lastCall.args[1], testItems.fakeValue);

});

