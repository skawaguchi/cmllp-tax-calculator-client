import React from 'react';
import {createRoutes, Route} from 'react-router';

import TaxCalculatorView from '../views/TaxCalculatorView';

export function getRoutes() {
    return createRoutes(
        <Route
            component={TaxCalculatorView}
            path='calculator/:province'
        />
    );
}
