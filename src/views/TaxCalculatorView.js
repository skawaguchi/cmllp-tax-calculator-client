import React, {PropTypes} from 'react';
import {FormattedMessage} from 'react-intl';

function TaxCalculatorView(props) {
    return (
        <section>
            <h1><FormattedMessage id='labels.appTitle' /></h1>
            <section>
                <div>Calculator goes here. Province is {props.params.province}</div>
            </section>
        </section>
    );
}


export default TaxCalculatorView;
