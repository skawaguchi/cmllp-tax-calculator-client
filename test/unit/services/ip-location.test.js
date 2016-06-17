import Chance from 'chance';
import sinon from 'sinon';
import test from 'ava';

import * as fetchService from '../../../src/services/fetch';

import {getProvince} from '../../../src/services/ip-location';

let chance,
    sandbox,
    fetchStub;

test.before(() => {
    chance = new Chance();
    sandbox = sinon.sandbox.create();

    fetchStub = sandbox.stub(fetchService, 'fetch')
        .returns({
            then: () => ({
                catch: () => {}
            })
        });
});

test.after(() => {
    sandbox.restore();
});

test('should call the location service', (t) => {
    getProvince();

    t.is(fetchStub.firstCall.args[0], 'http://ipinfo.io');
});

test('should call the location service', (t) => {
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

test('should return the json promise', (t) => {
    const fakeResponse = {
        json: () => ({
            then: () => ({
                catch: () => {
                }
            })
        }),
        ok: true
    };

    fetchStub.returns(Promise.resolve(fakeResponse));

    const returnValue = getProvince();

    t.true(returnValue instanceof Promise);
});
