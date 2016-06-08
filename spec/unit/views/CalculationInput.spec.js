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

test('# CalculationInput > Given the control renders', (t) => {

    setup();

    const fakeLabel = chance.string();
    const fakeInputID = chance.hash({length: 5});
    const fakeChangeHandler = () => {};

    const component = shallow(<CalculationInput
            changeHandler={fakeChangeHandler}
            inputID={fakeInputID}
            label={fakeLabel}
        />);

    t.equal(component.type(), 'div', 'should be a <div/>');
    t.equal(component.find('label').text(), fakeLabel, 'should display the label');
    t.equal(component.unrendered.props.changeHandler, fakeChangeHandler, 'should be passed a change handler');
    t.equal(component.unrendered.props.inputID, fakeInputID, 'should be assigned a unique identifier so that the change callback can know which input was pressed');

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
            inputID={fakeID}
        />
    );

    component.find('input').simulate('change', fakeEvent);

    t.equal(fakeChangeHandler.firstCall.args[0], fakeID, 'should call the change handler with the id');
    t.equal(fakeChangeHandler.firstCall.args[1], fakeValue, 'should call the change handler with the new value');

    t.end();
});

