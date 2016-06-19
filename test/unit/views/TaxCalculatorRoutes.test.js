import {shallow} from 'enzyme';
import React from 'react';
import sinon from 'sinon';
import test from 'ava';

import {browserHistory} from 'react-router';

import TaxCalculatorRoutes from '../../../src/views/TaxCalculatorRoutes';
import * as RouteFactory from '../../../src/factories/routes';

let sandbox;

test.beforeEach(() => {
    sandbox = sinon.sandbox.create();
});

test.afterEach(() => {
    sandbox.restore();
});

function setupTest() {
    const fakeRoutes = {};

    sandbox.stub(RouteFactory, 'getRoutes', () => fakeRoutes);

    const component = shallow(<TaxCalculatorRoutes />);

    return {
        component,
        fakeRoutes
    };
}

test('should set up the router with the routes from the route factory', (t) => {
    const testItems = setupTest();

    t.is(testItems.component.find('Router').prop('routes'), testItems.fakeRoutes);
});

test('should set up the router to use browser history', (t) => {
    const testItems = setupTest();

    t.is(testItems.component.find('Router').prop('history'), browserHistory);
});
