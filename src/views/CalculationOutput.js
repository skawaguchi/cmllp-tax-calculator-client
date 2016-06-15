import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import CurrencyDisplay from './CurrencyDisplay';
import PercentDisplay from './PercentDisplay';

export function CalculationOutput(props) {
    return (
        <section className='calculation-output'>

            <CurrencyDisplay
                className='federal-eligible-dividend-tax-credit'
                labelKey='labels.federalEligibleDividendTaxCredit'
                value={props.calculations.federalEligibleDividendTaxCredit}
            />

            <CurrencyDisplay
                className='federal-ineligible-dividend-tax-credit'
                labelKey='labels.federalIneligibleDividendTaxCredit'
                value={props.calculations.federalIneligibleDividendTaxCredit}
            />

            <CurrencyDisplay
                className='provincial-eligible-dividend-tax-credit'
                labelKey='labels.provincialEligibleDividendTaxCredit'
                value={props.calculations.provincialEligibleDividendTaxCredit}
            />

            <CurrencyDisplay
                className='provincial-ineligible-dividend-tax-credit'
                labelKey='labels.provincialIneligibleDividendTaxCredit'
                value={props.calculations.provincialIneligibleDividendTaxCredit}
            />

            <CurrencyDisplay
                className='total-tax-credits'
                labelKey='labels.totalTaxCredits'
                value={props.calculations.totalTaxCredits}
            />

            <CurrencyDisplay
                className='total-taxes'
                labelKey='labels.totalTaxes'
                value={props.calculations.totalTaxes}
            />

            <CurrencyDisplay
                className='income-after-taxes'
                labelKey='labels.incomeAfterTaxes'
                value={props.calculations.incomeAfterTaxes}
            />

            <PercentDisplay
                className='average-tax-rate'
                labelKey='labels.averageTaxRate'
                value={props.calculations.averageTaxRate}
            />

            <PercentDisplay
                className='marginal-tax-rate'
                labelKey='labels.marginalTaxRate'
                value={props.calculations.marginalTaxRate}
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
