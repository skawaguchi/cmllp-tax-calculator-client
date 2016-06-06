import Chance from 'chance';
import {match} from 'react-router';
import test from 'tape';

import {getRoutes} from '../../../src/factories/routes';

import TaxCalculatorView from '../../../src/views/TaxCalculatorView';

let chance,
    matchedRouteProps;

function setup() {
    chance = new Chance();
}

function setMatchedRouteProps(routes, location) {
    match({
        routes: routes,
        location: location
    }, (error, redirectLocation, renderProps) => {
        matchedRouteProps = renderProps
    });
}

test('# Routes Factory', (t) => {

    setup();

    const returnedRoutes = getRoutes();
    const mockProvince = chance.province();

    setMatchedRouteProps(returnedRoutes, `/calculator/${mockProvince}`);

    t.equal(matchedRouteProps.components[0], TaxCalculatorView, 'should set <TaxCalculatorView/> when the route is /calculator/:province');

    t.end();
});
