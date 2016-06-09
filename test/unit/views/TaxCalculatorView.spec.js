import {shallow} from 'enzyme';
import React from 'react';
import test from 'tape';

import TaxCalculatorView from '../../../src/views/TaxCalculatorView';

test('# TaxCalculatorView > Given the control renders', (t) => {

    const component = shallow(<TaxCalculatorView />);

    t.equal(component.type(), 'section', 'should be a <section/>');

    t.end();
});
