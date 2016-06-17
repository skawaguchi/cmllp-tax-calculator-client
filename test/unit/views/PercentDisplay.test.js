import Chance from 'chance';
import {shallow} from 'enzyme';
import React from 'react';
import test from 'ava';

import {FormattedMessage, FormattedNumber} from 'react-intl';

import PercentDisplay from '../../../src/views/PercentDisplay';

let chance;

function setupTest() {
    const fakeClassName = 'fake-class-name';
    const fakeLabelKey = chance.string();
    const fakeValue = chance.floating();

    const component = shallow(
        <PercentDisplay
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

test('should render the component', (t) => {
    const testItems = setupTest();

    t.is(testItems.component.find(FormattedMessage).prop('id'), testItems.fakeLabelKey);
    t.is(testItems.component.find(FormattedNumber).prop('style'), 'percent');
    t.is(testItems.component.find(FormattedNumber).prop('minimumFractionDigits'), 2);
    t.is(testItems.component.find(FormattedNumber).prop('value'), testItems.fakeValue);
    t.is(testItems.component.hasClass(testItems.fakeClassName), true);
});
