import React, {PropTypes} from 'react';
import {FormattedNumber, FormattedMessage} from 'react-intl';

function CalculationOutputItem(props) {
    return (
        <dl className={props.className}>
            <dt className='calculation-label'><FormattedMessage id={props.labelKey}/></dt>
            <dd className='calculation-value'><FormattedNumber
                currency='usd'
                style='currency'
                value={props.value}
            /></dd>
        </dl>
    );
}

CalculationOutputItem.displayName = 'CalculationOutputItem';

CalculationOutputItem.propTypes = {
    className: PropTypes.string.isRequired,
    labelKey: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired
};

export default CalculationOutputItem;
