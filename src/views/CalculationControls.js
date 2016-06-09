import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';

import CalculationInput from './CalculationInput';
import {
    getIncomeAfterTaxes,
    getNormalIncome
} from '../reducers/getAttributes';
import {FormattedMessage} from 'react-intl';
import {
    changeNormalIncome,
    getCalculations,
    setProvince,
    setYear
} from '../actions/action-creators';

function submitClicked(props) {
    props.dispatch(getCalculations());
}

export function CalculationControls(props) {

    props.dispatch(setProvince(props.params.province));
    props.dispatch(setYear(moment().format('YYYY')));

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
            <button type='submit' onClick={submitClicked.bind(null, props)}><FormattedMessage id='labels.submit'/></button>

            <dl>
                <dt>Income After Taxes</dt>
                <dd>{props.incomeAfterTaxes}</dd>
            </dl>
        </section>
    );
}

CalculationControls.propTypes = {
    dispatch: PropTypes.func.isRequired,
    incomeAfterTaxes: PropTypes.number.isRequired,
    normalIncome: PropTypes.number.isRequired
};

const mapStateToProps = (state) => ({
    incomeAfterTaxes: getIncomeAfterTaxes(state),
    normalIncome: getNormalIncome(state)
});

export default connect(mapStateToProps)(CalculationControls);
