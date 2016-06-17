import React from 'react';
import {shallow} from 'enzyme';
import test from 'ava';
import sinon from 'sinon';

import * as storeCreator from '../../../src/store/store-creator';
import * as reducers from '../../../src/reducers/index';
import * as messages from '../../../src/i18n/en';
import TaxCalculatorProvider from '../../../src/views/TaxCalculatorProvider';
import TaxCalculatorRoutes from '../../../src/views/TaxCalculatorRoutes';

let sandbox;

test.before(() => {
    sandbox = sinon.sandbox.create();
});

test.after(() => {
    sandbox.restore();
});

function createFakeStore() {
    return {
        dispatch: () => {},
        getState: () => {},
        subscribe: () => {}
    };
}

function setupTests() {
    const fakeStore = createFakeStore();

    sandbox.stub(reducers, 'getCombinedReducer', () => sandbox.stub());

    sandbox.stub(storeCreator, 'configureStore')
        .returns(fakeStore);

    const component = shallow(<TaxCalculatorProvider />);

    return {
        component,
        fakeStore
    };
}

/* eslint-disable max-statements */
test('# <TaxCalculatorProvider /> > Given the view is rendered', (t) => {

    const testItems = setupTests();

    t.is(testItems.component.find('Provider').props().store, testItems.fakeStore, 'should provide the store');

    t.is(testItems.component.find('IntlProvider').length, 1);
    t.is(testItems.component.find('IntlProvider').prop('locale'), 'en');
    t.is(testItems.component.find('IntlProvider').prop('messages'), messages.default);
    t.is(testItems.component.find(TaxCalculatorRoutes).length, 1);
});

