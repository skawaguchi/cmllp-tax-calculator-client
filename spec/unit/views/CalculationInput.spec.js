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

test('# CalculationControls > Given the control renders', (t) => {

    setup();

    const fakeLabel = chance.string();
    const fakeChangeHandler = () => {};

    const component = shallow(
        <CalculationInput
            changeHandler={fakeChangeHandler}
            label={fakeLabel}
        />
    );

    t.equal(component.type(), 'div', 'should be a <div/>');
    t.equal(component.find('label').text(), fakeLabel, 'should display the label');

    teardown();

    t.end();
});

test('# CalculationControls > when the input is changed', (t) => {

    setup();

    const fakeChangeHandler = sandbox.stub();
    const fakeValue = chance.string();
    const fakeEvent = {target: {value: fakeValue}};

    const component = shallow(
        <CalculationInput
            changeHandler={fakeChangeHandler}
        />
    );

    component.find('input').simulate('change', fakeEvent);

    t.equal(fakeChangeHandler.firstCall.args[0], fakeValue, 'should call the change handler with the value');

    t.end();
});

