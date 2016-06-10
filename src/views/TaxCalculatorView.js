import React, {PropTypes} from 'react';
import {FormattedMessage} from 'react-intl';

function TaxCalculatorView(props) {
    return (
        <section id='tax-calculator-view'>
            <h1><FormattedMessage id='labels.appTitle'/></h1>
            <section>{props.children}</section>
        </section>
    );
}

TaxCalculatorView.displayName = 'TaxCalculatorView';

TaxCalculatorView.propTypes = {
    children: PropTypes.object.isRequired
};

export default TaxCalculatorView;
