import React, {PropTypes} from 'react';
import {intlShape, FormattedMessage} from 'react-intl';

function getOptions(intl, options) {
    return options.map((option, index) => (
            <option
                key={`option-${ index }`}
                value={option.value}
            >
                {intl.formatMessage({id: option.labelKey})}
            </option>
        )
    );
}

function selectChanged(props, event) {
    props.changeHandler(event, event.target.value);
}

function CalculationSelect(props, context) {
    return (
        <div className='calculation-select'>
            <label
                htmlFor={props.selectID}
            >
                <FormattedMessage id={props.labelKey}/>
            </label>
            <select
                id={props.selectID}
                onChange={selectChanged.bind(null, props)}
                value={props.selectedValue}
            >
                {getOptions(context.intl, props.options)}
            </select>
        </div>
    );
}

CalculationSelect.displayName = 'CalculationSelect';

CalculationSelect.propTypes = {
    changeHandler: PropTypes.func.isRequired,
    labelKey: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    selectID: PropTypes.string.isRequired,
    selectedValue: PropTypes.string
};

CalculationSelect.contextTypes = {
    intl: intlShape
};

export default CalculationSelect;
