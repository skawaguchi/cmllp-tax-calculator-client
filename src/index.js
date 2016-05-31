import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';

import AppProvider from './AppProvider';

render(
    <AppProvider />,
    document.getElementById('tax-calculator-app')
);
