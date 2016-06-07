import {shallow} from 'enzyme';
import React from 'react';
import test from 'tape';

import CalculationControls from '../../../src/views/CalculationControls';

test('# CalculationControls > Given the control renders', (t) => {

    const component = shallow(<CalculationControls />);

    t.equal(component.find('.calculation-controls').length, 1, 'should have  a container for controls');

    t.end();
});
