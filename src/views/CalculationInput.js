import React, {PropTypes} from 'react';

function inputChanged(changeHandler, event) {
    changeHandler(event.target.value);
}

function CalculationInput(props) {
    return (
        <div className='calculation-input'>
            <label>{props.label}</label>
            <input onChange={inputChanged.bind(this, props.changeHandler)} />
        </div>
    );
}

CalculationInput.propTypes = {
    changeHandler: PropTypes.func.isRequired,
    label: PropTypes.string
};

export default CalculationInput;
