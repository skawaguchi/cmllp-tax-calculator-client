import React from 'react';
import {createRoutes, Route} from 'react-router';

import AppProvider from './AppProvider';

export function getRoutes() {
    return createRoutes(
        <Route
            component={AppProvider}
            path='calculator'
        />
    );
}
