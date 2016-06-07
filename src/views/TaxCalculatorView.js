import React, {PropTypes} from 'react';
import {FormattedMessage} from 'react-intl';
import CalculationControls from './CalculationControls';

function TaxCalculatorView(props) {
    return (
        <section>
            <h1><FormattedMessage id='labels.appTitle' /></h1>
            <section>
                <CalculationControls />
            </section>
        </section>
    );
}


export default TaxCalculatorView;
