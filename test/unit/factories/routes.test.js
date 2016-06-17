import Chance from 'chance';
import {match} from 'react-router';
import test from 'ava';

import {getRoutes} from '../../../src/factories/routes';

import TaxCalculatorView from '../../../src/views/TaxCalculatorView';

let chance,
    matchedRouteProps;

function setMatchedRouteProps(routes, location) {
    match({
        routes,
        location
    }, (error, redirectLocation, renderProps) => {
        matchedRouteProps = renderProps;
    });
}

test.before(() => {
    chance = new Chance();
});

test('should set <TaxCalculatorView/> when the route is /:province', (t) => {

    const returnedRoutes = getRoutes();
    const mockProvince = chance.province();

    setMatchedRouteProps(returnedRoutes, `/tax-calculator/${mockProvince}`);

    t.is(matchedRouteProps.components[0], TaxCalculatorView);

});
