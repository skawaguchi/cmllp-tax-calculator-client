import Chance from 'chance';
import {shallow} from 'enzyme';
import React from 'react';
import test from 'ava';

import {FormattedMessage, FormattedNumber} from 'react-intl';

import CurrencyDisplay from '../../../src/views/CurrencyDisplay';

let chance;

function setupTest() {
    const fakeClassName = 'fake-class-name';
    const fakeLabelKey = chance.string();
    const fakeValue = chance.floating();

    const component = shallow(
        <CurrencyDisplay
            className={fakeClassName}
            labelKey={fakeLabelKey}
            value={fakeValue}
        />
    );

    return {
        component,
        fakeClassName,
        fakeLabelKey,
        fakeValue
    };
}

test.beforeEach(() => {
    chance = new Chance();
});

test('# CurrencyDisplay > Given the value and label key are passed', (t) => {
    const testItems = setupTest();

    t.is(testItems.component.find(FormattedMessage).prop('id'), testItems.fakeLabelKey);
    t.is(testItems.component.find(FormattedNumber).prop('value'), testItems.fakeValue);
    t.is(testItems.component.find(FormattedNumber).prop('currency'), 'usd');
    t.is(testItems.component.find(FormattedNumber).prop('style'), 'currency');
    t.is(testItems.component.hasClass(testItems.fakeClassName), true);
});
