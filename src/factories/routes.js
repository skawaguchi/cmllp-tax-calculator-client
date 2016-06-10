import React from 'react';
import {createRoutes, Route} from 'react-router';

import CalculationControls from '../views/CalculationControls';
import TaxCalculatorView from '../views/TaxCalculatorView';

export function getRoutes() {
    return createRoutes(
        <Route
            component={TaxCalculatorView}
            path='tax-calculator'
        >
            <Route
                component={CalculationControls}
                path=':province'
            />
        </Route>
    );
}
