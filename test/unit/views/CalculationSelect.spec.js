import Chance from 'chance';
import {shallow} from 'enzyme';
import React from 'react';
import sinon from 'sinon';
import test from 'tape';

import '../../utils/dom-setup';

import CalculationSelect from '../../../src/views/CalculationSelect';

let chance,
    sandbox;

function setup() {
    sandbox = sinon.sandbox.create();
    chance = new Chance();
}

function teardown() {
    sandbox.restore();
}

function getFakeOption() {
    return {
        labelKey: chance.hash(),
        value: chance.hash()
    };
}

/* eslint-disable max-statements */
test('# <CalculationSelect/> > Given the component has rendered', (t) => {

    setup();

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

    t.equal(component.type(), 'div', 'should be a <div>');
    t.equal(component.prop('className'), 'calculation-select', 'should have an identifying css class');
    t.equal(component.find('label').length, 1, 'should have a label');
    t.equal(component.find('select').length, 1, 'should have a select control');
    t.equal(component.find('select').prop('id'), fakeSelectID, 'should have an id on the select control');
    t.equal(component.find('label').prop('htmlFor'), fakeSelectID, 'should have the label reference the select control');
    t.equal(component.find('label').find('FormattedMessage').length, 1, 'should have a localized message in the label');
    t.equal(component.find('label').find('FormattedMessage').prop('id'), fakeLabelKey, 'should pass a key for the label translation');
    t.equal(component.unrendered.props.changeHandler, fakeChangeHandler, 'should have a change handler');
    t.equal(component.find('option').length, fakeOptions.length, 'should have a list of options');
    t.equal(component.unrendered.props.selectedValue, fakeSelectedValue, 'should set the value');

    t.test('when the select is changed', (st) => {

        const fakeValue = chance.string();
        const fakeEvent = {target: {value: fakeValue}};

        component.find('select').simulate('change', fakeEvent);

        st.equal(fakeChangeHandler.firstCall.args[0], fakeEvent, 'should call with the event');
        st.equal(fakeChangeHandler.firstCall.args[1], fakeValue, 'should call with the value');

        st.end();

    });

    teardown();

    t.end();
});
