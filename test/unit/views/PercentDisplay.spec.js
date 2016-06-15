import Chance from 'chance';
import {shallow} from 'enzyme';
import React from 'react';
import test from 'tape';

import {FormattedMessage, FormattedNumber} from 'react-intl';

import PercentDisplay from '../../../src/views/PercentDisplay';

let chance;

function setup() {
    chance = new Chance();
}

/* eslint-disable max-statements */

test('# PercentDisplay > Given the value and label key are passed', (t) => {

    setup();

    const fakeClassName = 'fake-class-name';
    const fakeValue = chance.floating();
    const fakeLabelKey = chance.string();
    const component = shallow(
        <PercentDisplay
            className={fakeClassName}
            labelKey={fakeLabelKey}
            value={fakeValue}
        />
    );

    t.equal(component.find(FormattedMessage).prop('id'), fakeLabelKey, 'should set the label key');
    t.equal(component.find(FormattedNumber).prop('style'), 'percent', 'should set the intl style to display as a percent');
    t.equal(component.find(FormattedNumber).prop('minimumFractionDigits'), 2, 'should set the number to be displayed with 2 digits');
    t.equal(component.find(FormattedNumber).prop('value'), fakeValue, 'should set the value');
    t.equal(component.hasClass(fakeClassName), true, 'should set the class name of the component');

    t.end();
});
