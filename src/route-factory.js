import React from 'react';
import {createRoutes, Route} from 'react-router';

import TaxCaltulatorProvider from './views/TaxCalculatorProvider';

export function getRoutes() {
    return createRoutes(
        <Route
            component={TaxCaltulatorProvider}
            path='calculator'
        />
    );
}
