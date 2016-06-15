import t from 'tcomb';
import moment from 'moment';

import Calculations from './types/calculations';
import Inputs from './types/inputs';

const State = t.struct({
    calculations: Calculations,
    inputs: Inputs
}, 'State');

export function getDefaultState() {
    return State({
        calculations: {
            averageTaxRate: 0,
            incomeAfterTaxes: 0,
            federalEligibleDividendTaxCredit: 0,
            federalIneligibleDividendTaxCredit: 0,
            marginalTaxRate: 0,
            netTaxPayable: 0,
            provincialEligibleDividendTaxCredit: 0,
            provincialIneligibleDividendTaxCredit: 0,
            taxableDividends: 0,
            taxableNormalIncome: 0,
            totalOverallTaxes: 0,
            totalTaxableIncome: 0,
            totalTaxCredits: 0,
            totalTaxes: 0
        },
        inputs: {
            capitalGains: 0,
            eligibleDividends: 0,
            ineligibleDividends: 0,
            normalIncome: 0,
            province: '',
            rrspContributions: 0,
            taxesAlreadyPaid: 0,
            year: moment().format('YYYY')
        }
    });
}

export default State;
