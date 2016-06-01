import t from 'tcomb';

import Calculation from './types/calculation';

const State = t.struct({
    calculation: Calculation
}, 'State');

export function getDefaultState() {
    return State({
        calculation: {
            capitalGains: 0,
            eligibleDividends: 0,
            ineligibleDividends: 0,
            normalIncome: 0,
            province: '',
            rrspContributions: 0,
            taxesAlreadyPaid: 0,
            year: ''
        }
    });
}

export default State;
