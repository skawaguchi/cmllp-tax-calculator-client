import Chance from 'chance';
import {shallow} from 'enzyme';
import sinon from 'sinon';
import React from 'react';
import test from 'tape';

import CalculationInput from '../../../src/views/CalculationInput';

let chance,
    sandbox;

function setup() {
    chance = new Chance();
    sandbox = sinon.sandbox.create();
}

function teardown() {
    sandbox.restore();
}

/* eslint-disable max-statements */

test('# CalculationInput > Given the control renders', (t) => {

    setup();

    const fakeLabelKey = chance.hash();
    const fakeInputID = chance.hash({length: 5});
    const fakeClassName = chance.hash({length: 5});
    const fakeValue = chance.floating({max: 10000});
    const fakeChangeHandler = () => {};

    const component = shallow(
        <CalculationInput
            changeHandler={fakeChangeHandler}
            className={fakeClassName}
            inputID={fakeInputID}
            inputValue={fakeValue}
            labelKey={fakeLabelKey}
        />
    );

    t.equal(component.type(), 'div', 'should be a <div/>');

    t.equal(component.find('label FormattedMessage').prop('id'), fakeLabelKey, 'should have a localized label');

    t.equal(component.unrendered.props.changeHandler, fakeChangeHandler, 'should be passed a change handler');
    t.equal(component.prop('className'), `calculation-input ${fakeClassName}`, 'should be passed a className');
    t.equal(component.unrendered.props.inputID, fakeInputID, 'should be assigned a unique identifier so that the change callback can know which input was pressed');
    t.equal(component.unrendered.props.labelKey, fakeLabelKey, 'should have a label key that matches up to a translated value');

    t.equal(component.find('input').prop('type'), 'number', 'should have a numeric input');
    t.equal(component.find('input').prop('value'), fakeValue, 'should have a value');

    teardown();

    t.end();
});

test('# CalculationInput > when the input is changed', (t) => {

    setup();

    const fakeChangeHandler = sandbox.stub();
    const fakeValue = chance.string();
    const fakeID = chance.hash();
    const fakeEvent = {target: {value: fakeValue}};

    const component = shallow(
        <CalculationInput
            changeHandler={fakeChangeHandler}
            className='fake-class-name'
            inputID={fakeID}
        />
    );

    component.find('input').simulate('change', fakeEvent);

    t.equal(fakeChangeHandler.firstCall.args[0], fakeID, 'should call the change handler with the id');
    t.equal(fakeChangeHandler.firstCall.args[1], fakeValue, 'should call the change handler with the new value');

    t.end();
});

