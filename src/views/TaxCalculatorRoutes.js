import React from 'react';
import {Router, browserHistory} from 'react-router';

import {getRoutes} from '../factories/routes';

function TaxCalculatorRoutes() {
    return (
        <Router
            history={browserHistory}
            routes={getRoutes()}
        />
    );
}

export default TaxCalculatorRoutes;
