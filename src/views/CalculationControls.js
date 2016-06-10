import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';

import CalculationInput from './CalculationInput';
import {FormattedMessage} from 'react-intl';
import {
    changeInput,
    getCalculations,
    setProvince,
    setYear
} from '../actions/action-creators';
import Inputs from '../state/types/inputs';

function submitClicked(props) {
    props.dispatch(getCalculations());
}

function inputChanged(props, id, value) {
    props.dispatch(changeInput(id, value));
}

export function CalculationControls(props) {

    props.dispatch(setProvince(props.params.province));
    props.dispatch(setYear(moment().format('YYYY')));

    return (
        <section className='calculation-controls'>

            <CalculationInput
                changeHandler={inputChanged.bind(null, props)}
                className='normal-income-input'
                inputID='normalIncome'
                inputValue={props.inputs.normalIncome}
                labelKey='labels.normalIncome'
            />

            <CalculationInput
                changeHandler={inputChanged.bind(null, props)}
                className='capital-gains-input'
                inputID='capitalGains'
                inputValue={props.inputs.capitalGains}
                labelKey='labels.capitalGains'
            />

            <CalculationInput
                changeHandler={inputChanged.bind(null, props)}
                className='eligible-dividends-input'
                inputID='eligibleDividends'
                inputValue={props.inputs.eligibleDividends}
                labelKey='labels.eligibleDividends'
            />

            <CalculationInput
                changeHandler={inputChanged.bind(null, props)}
                className='ineligible-dividends-input'
                inputID='ineligibleDividends'
                inputValue={props.inputs.ineligibleDividends}
                labelKey='labels.ineligibleDividends'
            />

            <CalculationInput
                changeHandler={inputChanged.bind(null, props)}
                className='rrsp-contributions-input'
                inputID='rrspContributions'
                inputValue={props.inputs.rrspContributions}
                labelKey='labels.rrspContributions'
            />

            <CalculationInput
                changeHandler={inputChanged.bind(null, props)}
                className='taxes-already-paid-input'
                inputID='taxesAlreadyPaid'
                inputValue={props.inputs.taxesAlreadyPaid}
                labelKey='labels.taxesAlreadyPaid'
            />

            <button
                className='submit-button'
                type='submit'
                onClick={submitClicked.bind(null, props)}
            >
                <FormattedMessage
                    id='labels.submit'
                />
            </button>
        </section>
    );
}

CalculationControls.propTypes = {
    dispatch: PropTypes.func.isRequired,
    inputs: PropTypes.instanceOf(Inputs).isRequired,
    params: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    inputs: state.inputs
});

export default connect(mapStateToProps)(CalculationControls);
