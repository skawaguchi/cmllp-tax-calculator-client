import test from 'tape';
import {match} from 'react-router';

import {getRoutes} from '../../src/route-factory';

import TaxCaltulatorProvider from '../../src/views/TaxCalculatorProvider';

test('# Route Factory', (t) => {

    let matchedRouteProps;

    function setMatchedRouteProps(routes, location) {
        match({
            routes,
            location
        }, (error, redirectLocation, renderProps) => {
            matchedRouteProps = renderProps;
        });
    }

    const expectedRoutes = getRoutes();
    const appIndex = 0;

    setMatchedRouteProps(expectedRoutes, '/calculator');

    t.deepEqual(matchedRouteProps.components[appIndex], TaxCaltulatorProvider, 'should provide <TaxCaltulatorProvider /> for the /calculator route');

    t.end();

});
