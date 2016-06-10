import React, {PropTypes} from 'react';
import {FormattedMessage} from 'react-intl';

import CalculationOutput from './CalculationOutput';

function TaxCalculatorView(props) {
    return (
        <section id='tax-calculator-view'>
            <h1><FormattedMessage id='labels.appTitle'/></h1>
            <section id='input-container'>{props.children}</section>
            <section id='output-container'>
                <CalculationOutput />
            </section>
        </section>
    );
}

TaxCalculatorView.displayName = 'TaxCalculatorView';

TaxCalculatorView.propTypes = {
    children: PropTypes.object.isRequired
};

export default TaxCalculatorView;
