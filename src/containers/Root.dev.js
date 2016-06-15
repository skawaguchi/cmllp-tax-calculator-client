import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';

import TaxCalculatorProvider from '../views/TaxCalculatorProvider.dev';

render(
    <TaxCalculatorProvider />,
    document.getElementById('tax-calculator-app')
);
