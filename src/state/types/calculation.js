import t from 'tcomb';

const Calculation = t.struct({
    capitalGains: t.Number,
    eligibleDividends: t.Number,
    ineligibleDividends: t.Number,
    normalIncome: t.Number,
    province: t.String,
    rrspContributions: t.Number,
    taxesAlreadyPaid: t.Number,
    year: t.String
}, 'Calculation');

export default Calculation;
