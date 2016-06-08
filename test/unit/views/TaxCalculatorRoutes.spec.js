import {shallow} from 'enzyme';
import React from 'react';
import sinon from 'sinon';
import test from 'tape';

import {browserHistory} from 'react-router';

import TaxCalculatorRoutes from '../../../src/views/TaxCalculatorRoutes';
import * as RouteFactory from '../../../src/factories/routes';

let sandbox;

function setup() {
    sandbox = sinon.sandbox.create();
}

function teardown() {
    sandbox.restore();
}

test('# <TaxCalculatorRoutes /> > Given the view is rendered', (t) => {

    setup();

    const fakeRoutes = {};

    sandbox.stub(RouteFactory, 'getRoutes', () => fakeRoutes);

    const component = shallow(<TaxCalculatorRoutes />);

    t.equal(component.find('Router').length, 1, 'should have a router');
    t.equal(component.find('Router').prop('routes'), fakeRoutes, 'should load the routes');
    t.equal(component.find('Router').prop('history'), browserHistory, 'should load the history from the browser');

    teardown();

    t.end();

});
