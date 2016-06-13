import Chance from 'chance';
import sinon from 'sinon';
import test from 'blue-tape';

import * as fetchService from '../../../src/services/fetch';

import {getProvince} from '../../../src/services/ip-location';

let chance,
    sandbox,
    fetchStub;

function setup() {
    chance = new Chance();
    sandbox = sinon.sandbox.create();

    fetchStub = sandbox.stub(fetchService, 'fetch')
        .returns({
            then: () => ({
                catch: () => {}
            })
        });
}

function teardown() {
    sandbox.restore();
}

const suiteName = '# IP Location > getProvince()';

test(`${suiteName} > Request`, (t) => {
    setup();

    getProvince();

    t.equal(fetchStub.firstCall.args[0], 'http://ipinfo.io', 'should call the location service');

    teardown();

    t.end();
});

test(`${suiteName} > Response success`, (t) => {
    setup();

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

    t.equal(returnValue instanceof Promise, true, 'should call the location service');

    teardown();

    t.end();
});

test(`${suiteName} > Response success`, (t) => {
    setup();

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

    t.equal(returnValue instanceof Promise, true, 'should return the json promise');

    teardown();

    t.end();
});
