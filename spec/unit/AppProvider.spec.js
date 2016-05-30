
import React from 'react';
import {shallow} from 'enzyme';
import test from 'tape';
// import {match} from 'react-router';
// import Chance from 'chance';
//
// import {getRoutes} from '../../src/route-factory';

import AppProvider from '../../src/AppProvider';

test('# <AppProvider/>', (t) => {

    t.test('content', (st) => {
        const component = shallow(<AppProvider/>);

        st.equal(component.find('div').length, 1, 'should have a div');
        st.end();
    });

});
