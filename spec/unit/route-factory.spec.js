import test from 'tape';
import {match} from 'react-router';

import {getRoutes} from '../../src/route-factory';

import AppProvider from '../../src/AppProvider';

test('# route-factory', (t) => {

    let matchedRouteProps;

    function setMatchedRouteProps(routes, location) {
        match({
            routes,
            location
        }, (error, redirectLocation, renderProps) => {
            matchedRouteProps = renderProps;
        });
    }

    t.test('getRoutes', (st) => {

        const expectedRoutes = getRoutes();
        const appIndex = 0;

        setMatchedRouteProps(expectedRoutes, '/calculator');

        st.deepEquals(matchedRouteProps.components[appIndex], AppProvider, 'should provide <AppProvider/> for the /calculator route');

        st.end();
    });

});
