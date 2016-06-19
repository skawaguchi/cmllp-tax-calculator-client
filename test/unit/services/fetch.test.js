import Chance from 'chance';
import sinon from 'sinon';
import test from 'ava';
import * as fetchService from '../../../src/services/fetch';

let sandbox,
    chance;

test.beforeEach(() => {
    chance = new Chance();
    sandbox = sinon.sandbox.create();
});

test.afterEach(() => {
    sandbox.restore();
});

/* eslint-disable max-statements */
test('should make the fetch call', (t) => {
    const fakeURL = chance.url();
    const fakeResponse = {ok: true};
    const fakeOption = {someFakeOption: true};

    const fetchMock = sandbox.mock(global)
        .expects('fetch');

    fetchMock.returns(Promise.resolve(fakeResponse));

    fetchService.fetch(fakeURL, fakeOption).then(() => {});

    const expectedHeaders = fetchMock.firstCall.args[1].headers;

    t.is(fetchMock.firstCall.args[0], fakeURL);
    t.is(expectedHeaders.Accept, 'application/json');
    t.is(expectedHeaders['Content-Type'], 'application/json');
    t.is(fetchMock.lastCall.args[1].someFakeOption, true);
});

test.serial('should pass the successful fetch back to the consumer', async function (t) {
    const fakeResponse = {ok: true};

    const fetchMock = sandbox.mock(global)
        .expects('fetch');

    fetchMock.returns(Promise.resolve(fakeResponse));

    t.is(await fetchService.fetch(), fakeResponse);
});

test.serial('should pass the failure back to the consumer', async function (t) {
    const fakeResponse = {ok: false};

    const fetchMock = sandbox.mock(global)
        .expects('fetch');

    fetchMock.returns(Promise.resolve(fakeResponse));

    const reason = await t.throws(fetchService.fetch());

    t.is(reason, fakeResponse);
});
