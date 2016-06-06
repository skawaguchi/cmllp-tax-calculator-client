import React from 'react';
import {shallow} from 'enzyme';
import test from 'tape';
import sinon from 'sinon';

import * as storeCreator from '../../../src/store/store-creator';
import * as reducers from '../../../src/reducers/index';
import * as messages from '../../../src/i18n/en';
import TaxCalculatorProvider from '../../../src/views/TaxCalculatorProvider';
import TaxCalculatorRoutes from '../../../src/views/TaxCalculatorRoutes';

let sandbox;

function setup() {
    sandbox = sinon.sandbox.create();
}

function teardown() {
    sandbox.restore();
}

function createFakeStore() {
    return {
        dispatch: () => {},
        getState: () => {},
        subscribe: () => {}
    };
}

test('# <TaxCalculatorProvider /> > Given the view is rendered', (t) => {

    setup();

    const fakeStore = createFakeStore();

    sandbox.stub(reducers, 'getCombinedReducer', () => sandbox.stub());

    sandbox.stub(storeCreator, 'configureStore')
        .returns(fakeStore);

    const component = shallow(<TaxCalculatorProvider />);

    t.equal(component.find('Provider').props().store, fakeStore, 'should provide the store');

    t.equal(component.find('IntlProvider').length, 1, 'should be localized');
    t.equal(component.find('IntlProvider').prop('locale'), 'en', 'should be English');
    t.equal(component.find('IntlProvider').prop('messages'), messages.default, 'should pass on messages');

    t.equal(component.find(TaxCalculatorRoutes).length, 1, 'should have a <TaxCalculatorRoutes /> component');

    teardown();

    t.end();
});

