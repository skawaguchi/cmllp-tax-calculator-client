import t from 'tcomb';

import Calculation from './types/calculation';

const state = t.struct({
    calculation: Calculation
}, 'State');

export function getDefaultState() {
    return state({
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

export default state;
