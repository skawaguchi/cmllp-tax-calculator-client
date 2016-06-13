import Chance from 'chance';
import sinon from 'sinon';
import test from 'blue-tape';
import * as fetchService from '../../../src/services/fetch';

let sandbox,
    fetchMock,
    chance;

function setup() {
    chance = new Chance();
    sandbox = sinon.sandbox.create();

    fetchMock = sandbox.mock(global).expects('fetch');
}

function teardown() {
    sandbox.restore();
}

const suiteName = '# Fetch Service > fetch() > ';

test(`${suiteName} Request`, (t) => {
    setup();

    const fakeURL = chance.url();
    const fakeResponse = {ok: true};
    const fakeOption = {someFakeOption: true};

    fetchMock.returns(Promise.resolve(fakeResponse));

    fetchService.fetch(fakeURL, fakeOption).then(() => {});

    t.equal(fetchMock.firstCall.args[0], fakeURL, 'should request a URL.');
    t.equal(fetchMock.firstCall.args[1].headers.Accept, 'application/json', 'should request with the accept json header');
    t.equal(fetchMock.firstCall.args[1].headers['Content-Type'], 'application/json', 'should request with the content-type json header.');
    t.equal(fetchMock.firstCall.args[1].someFakeOption, true, 'should pass on additional options.');

    teardown();

    t.end();
});

test(`${suiteName} Response Success`, (t) => {
    setup();

    const fakeResponse = {ok: true};

    fetchMock.returns(Promise.resolve(fakeResponse));

    fetchService.fetch().then((response) => {
        t.equal(response, fakeResponse, 'should pass the successful fetch back to the consumer');

        teardown();

        t.end();
    });

});


test(`${suiteName} Response Error`, (t) => {

    setup();

    const fakeResponse = {ok: false};

    fetchMock.returns(Promise.resolve(fakeResponse));
    fetchService.fetch()
        .catch((response) => {
            t.equal(response, fakeResponse, 'should pass the failure back to the consumer');
            teardown();

            t.end();
        });
});
