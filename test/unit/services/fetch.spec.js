import Chance from 'chance';
import sinon from 'sinon';
import test from 'tape';
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

test('# Fetch Service > fetch()', (t) => {

    t.test('> Request', (st) => {
        setup();

        const fakeURL = chance.url();
        const fakeResponse = {ok: true};
        const fakeOption = {someFakeOption: true};

        fetchMock.returns(Promise.resolve(fakeResponse));

        fetchService.fetch(fakeURL, fakeOption).then(() => {});

        st.equal(fetchMock.firstCall.args[0], fakeURL, 'should request a URL.');
        st.equal(fetchMock.firstCall.args[1].Accept, 'application/json', 'should request to get JSON.');
        st.equal(fetchMock.firstCall.args[1]['Content-Type'], 'application/json', 'should request to get JSON.');
        st.equal(fetchMock.firstCall.args[1].someFakeOption, true, 'should pass on additional options.');

        teardown();

        st.end();
    });

    t.test('> Response Success', (st) => {
        setup();

        const fakeResponse = {ok: true};

        fetchMock.returns(Promise.resolve(fakeResponse));

        fetchService.fetch().then((response) => {
            st.equal(response, fakeResponse, 'should pass the successful fetch back to the consumer');
        });

        teardown();

        st.end();
    });

    t.test('> Response Error', (st) => {
        setup();

        const fakeResponse = {ok: false};

        fetchMock.returns(Promise.resolve(fakeResponse));

        fetchService.fetch()
            .catch((response) => {
                st.equal(response, fakeResponse, 'should pass the failure back to the consumer');
            });

        teardown();

        st.end();
    });

    t.end();
});
