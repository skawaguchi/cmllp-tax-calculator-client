import React, {PropTypes, Component} from 'react';

function inputChanged(id, changeHandler, event) {
    changeHandler(id, event.target.value);
}

class CalculationInput extends Component {
    render() {
        return (
            <div className='calculation-input'>
                <label>{this.props.label}</label>
                <input onChange={inputChanged.bind(null, this.props.inputID, this.props.changeHandler)} />
            </div>
        );
    }
}

CalculationInput.propTypes = {
    changeHandler: PropTypes.func.isRequired,
    inputID: PropTypes.string.isRequired,
    label: PropTypes.string
};

export default CalculationInput;
