import Chance from 'chance';
import sinon from 'sinon';
import test from 'ava';

import * as fetchService from '../../../src/services/fetch';

import {getProvince} from '../../../src/services/ip-location';

let chance,
    sandbox,
    fetchStub;

test.beforeEach(() => {
    chance = new Chance();
    sandbox = sinon.sandbox.create();

    fetchStub = sandbox.stub(fetchService, 'fetch');
});

test.afterEach(() => {
    sandbox.restore();
});

test('should call the location service', (t) => {
    fetchStub.returns(Promise.resolve({json: () => {}}));

    getProvince();
    t.is(fetchStub.lastCall.args[0], 'http://ipinfo.io');
});

test('should provide a promise for the location call', (t) => {
    const fakeProvince = chance.province();
    const fakeResponse = {
        json: () => ({
            then: () => ({
                country: 'CA',
                region: fakeProvince
            })
        }),
        ok: true
    };

    fetchStub.returns(Promise.resolve(fakeResponse));

    const returnValue = getProvince();

    t.true(returnValue instanceof Promise);
});

test('should return the json promise when the promise resolves', async (t) => {

    const fakeResponse = {
        json: sandbox.spy(),
        ok: true
    };

    fetchStub.returns(Promise.resolve(fakeResponse));
    
    t.is(fakeResponse.json.callCount, 0);

    await getProvince();

    t.is(fakeResponse.json.callCount, 1);

});
