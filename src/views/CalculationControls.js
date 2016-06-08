import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import CalculationInput from './CalculationInput';
import {changeNormalIncome} from '../actions/action-creators';
import {getNormalIncome} from '../reducers/getAttributes';

export function CalculationControls(props) {
    return (
        <section className='calculation-controls'>
            <CalculationInput
                changeHandler={(id, value) => {
                    props.dispatch(changeNormalIncome(id, value));
                }}
                className='normal-income-input'
                inputID='normalIncome'
                inputValue={props.normalIncome}
                labelKey='labels.normalIncome'
            />
        </section>
    );
}

CalculationControls.propTypes = {
    dispatch: PropTypes.func.isRequired,
    normalIncome: PropTypes.number.isRequired
};

const mapStateToProps = (state) => ({
    normalIncome: getNormalIncome(state)
});

export default connect(mapStateToProps)(CalculationControls);
