import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import CalculationOutputItem from './CalculationOutputItem';

export function CalculationOutput(props) {
    return (
        <section className='calculation-output'>

            <CalculationOutputItem
                className='federal-eligible-dividend-tax-credit'
                labelKey='labels.federalEligibleDividendTaxCredit'
                value={props.calculations.federalEligibleDividendTaxCredit}
            />

            <CalculationOutputItem
                className='federal-ineligible-dividend-tax-credit'
                labelKey='labels.federalIneligibleDividendTaxCredit'
                value={props.calculations.federalIneligibleDividendTaxCredit}
            />

            <CalculationOutputItem
                className='provincial-eligible-dividend-tax-credit'
                labelKey='labels.provincialEligibleDividendTaxCredit'
                value={props.calculations.provincialEligibleDividendTaxCredit}
            />

            <CalculationOutputItem
                className='provincial-ineligible-dividend-tax-credit'
                labelKey='labels.provincialIneligibleDividendTaxCredit'
                value={props.calculations.provincialIneligibleDividendTaxCredit}
            />

            <CalculationOutputItem
                className='total-tax-credits'
                labelKey='labels.totalTaxCredits'
                value={props.calculations.totalTaxCredits}
            />

            <CalculationOutputItem
                className='total-taxes'
                labelKey='labels.totalTaxes'
                value={props.calculations.totalTaxes}
            />

            <CalculationOutputItem
                className='income-after-taxes'
                labelKey='labels.incomeAfterTaxes'
                value={props.calculations.incomeAfterTaxes}
            />

        </section>
    );
}

CalculationOutput.displayName = 'CalculationOutput';

CalculationOutput.propTypes = {
    calculations: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    calculations: state.calculations
});

export default connect(mapStateToProps)(CalculationOutput);
