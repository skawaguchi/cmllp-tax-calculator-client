import React, {PropTypes} from 'react';
import {FormattedMessage} from 'react-intl';

function inputChanged(id, changeHandler, event) {
    changeHandler(id, event.target.value);
}

function getClassName(className) {
    return `calculation-input ${className}`;
}

function CalculationInput(props) {
    return (
        <div className={getClassName(props.className)}>
            <label><FormattedMessage id={props.labelKey}/></label>
            <input
                onChange={inputChanged.bind(null, props.inputID, props.changeHandler)}
                type='number'
                value={props.inputValue}
            />
        </div>
    );
}

CalculationInput.propTypes = {
    changeHandler: PropTypes.func.isRequired,
    className: PropTypes.string.isRequired,
    inputID: PropTypes.string.isRequired,
    inputValue: PropTypes.number.isRequired,
    labelKey: PropTypes.string
};

export default CalculationInput;
