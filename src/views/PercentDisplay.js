import React, {PropTypes} from 'react';
import {FormattedNumber, FormattedMessage} from 'react-intl';

function PercentDisplay(props) {
    return (
        <dl className={props.className}>
            <dt className='calculation-label'>
                <FormattedMessage
                    id={props.labelKey}
                />
            </dt>
            <dd className='calculation-value'>
                <FormattedNumber
                    minimumFractionDigits={2}
                    style='percent'
                    value={props.value}
                />
            </dd>
        </dl>
    );
}

PercentDisplay.displayName = 'PercentDisplay';

PercentDisplay.propTypes = {
    className: PropTypes.string.isRequired,
    labelKey: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired
};

export default PercentDisplay;
