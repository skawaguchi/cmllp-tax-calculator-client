import {shallow} from 'enzyme';
import React from 'react';
import test from 'tape';

import TaxCalculatorView from '../../../src/views/TaxCalculatorView';
import CalculationOutput from '../../../src/views/CalculationOutput';

test('# TaxCalculatorView > Given the control renders', (t) => {

    const component = shallow(<TaxCalculatorView />);

    t.equal(component.type(), 'section', 'should be a <section/>');
    t.equal(component.find('#tax-calculator-view').length, 1, 'should have a css identifier');
    t.equal(component.find('#input-container').length, 1, 'should have a container for the inputs');
    t.equal(component.find(CalculationOutput).length, 1, 'should have a container for the output');

    t.end();
});
