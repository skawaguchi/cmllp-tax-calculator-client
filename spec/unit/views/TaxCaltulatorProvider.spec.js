
import React from 'react';
import {shallow} from 'enzyme';
import test from 'tape';
import sinon from 'sinon';
// import {match} from 'react-router';
// import Chance from 'chance';

// import {getRoutes} from '../../../src/route-factory';
// import {getCombinedReducer} from '../../../src/reducers/index';
import * as storeCreator from '../../../src/store/store-creator';
import TaxCalculatorProvider from '../../../src/views/TaxCalculatorProvider';

let sandbox;

function setup() {
    sandbox = sinon.sandbox.create();
}

function teardown() {
    sandbox.restore();
}

function createFakeStore() {
    return {
        getState: () => {},
        subscribe: () => {},
        dispatch: () => {}
    };
}

test('# <TaxCalculatorProvider /> > Given the view is rendered', (t) => {

    setup();

    const fakeStore = createFakeStore();

    sandbox.stub(storeCreator, 'createStore')
        .returns(fakeStore);

    const component = shallow(<TaxCalculatorProvider />);

    t.equal(component.props().store, fakeStore, 'should provide the store');

    teardown();

    t.end();
});
