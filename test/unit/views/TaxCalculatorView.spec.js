import {shallow} from 'enzyme';
import React from 'react';
import test from 'tape';

import TaxCalculatorView from '../../../src/views/TaxCalculatorView';

test('# TaxCalculatorView > Given the control renders', (t) => {

    const component = shallow(<TaxCalculatorView />);

    t.equal(component.find('Connect(CalculationControls)').length, 1, 'should have a <CalculatorControls /> child');

    t.end();
});
