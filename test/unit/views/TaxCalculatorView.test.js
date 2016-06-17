import {shallow} from 'enzyme';
import React from 'react';
import test from 'ava';

import TaxCalculatorView from '../../../src/views/TaxCalculatorView';
import CalculationOutput from '../../../src/views/CalculationOutput';

let component;

test.before(() => {
    component = shallow(
        <TaxCalculatorView
            children={<div className='.fake-child'></div>}
        />
    );
});

test('should be a <section/>', (t) => {
    t.is(component.type(), 'section');
});

test('should have a css identifier', (t) => {
    t.is(component.find('#tax-calculator-view').length, 1);
});

test('should have a container for the inputs', (t) => {
    t.is(component.find('#input-container').length, 1);
});

test('should have a container for the output', (t) => {
    t.is(component.find(CalculationOutput).length, 1);
});
