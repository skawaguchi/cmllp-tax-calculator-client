import React, {PropTypes} from 'react';
import {FormattedMessage} from 'react-intl';

import CalculationOutput from './CalculationOutput';

import './tax-calculator.scss';

function TaxCalculatorView(props) {
    return (
        <section id='tax-calculator-view'>
            <h1><FormattedMessage id='labels.appTitle'/></h1>
            <ul className='calculations-container'>
                <li id='input-container'>
                    {props.children}
                </li>
                <li id='output-container'>
                    <CalculationOutput />
                </li>
            </ul>
        </section>
    );
}

TaxCalculatorView.displayName = 'TaxCalculatorView';

TaxCalculatorView.propTypes = {
    children: PropTypes.object.isRequired
};

export default TaxCalculatorView;
