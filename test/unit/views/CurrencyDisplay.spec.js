import Chance from 'chance';
import {shallow} from 'enzyme';
import React from 'react';
import test from 'tape';

import {FormattedMessage, FormattedNumber} from 'react-intl';

import CurrencyDisplay from '../../../src/views/CurrencyDisplay';

let chance;

function setup() {
    chance = new Chance();
}

/* eslint-disable max-statements */

test('# CurrencyDisplay > Given the value and label key are passed', (t) => {

    setup();

    const fakeClassName = 'fake-class-name';
    const fakeValue = chance.floating();
    const fakeLabelKey = chance.string();
    const component = shallow(
        <CurrencyDisplay
            className={fakeClassName}
            labelKey={fakeLabelKey}
            value={fakeValue}
        />
    );

    t.equal(component.find(FormattedMessage).prop('id'), fakeLabelKey, 'should set the label key');
    t.equal(component.find(FormattedNumber).prop('value'), fakeValue, 'should set the value');
    t.equal(component.find(FormattedNumber).prop('currency'), 'usd', 'should set the currency value format to US dollars');
    t.equal(component.find(FormattedNumber).prop('style'), 'currency', 'should set the display style as currency');
    t.equal(component.hasClass(fakeClassName), true, 'should set the class name of the component');

    t.end();
});
