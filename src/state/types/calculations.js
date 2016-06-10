import t from 'tcomb';

const Calculations = t.struct({
    federalEligibleDividendTaxCredit: t.Number,
    federalIneligibleDividendTaxCredit: t.Number,
    incomeAfterTaxes: t.Number,
    netTaxPayable: t.Number,
    provincialEligibleDividendTaxCredit: t.Number,
    provincialIneligibleDividendTaxCredit: t.Number,
    taxableDividends: t.Number,
    taxableNormalIncome: t.Number,
    totalOverallTaxes: t.Number,
    totalTaxableIncome: t.Number,
    totalTaxCredits: t.Number,
    totalTaxes: t.Number
}, 'Calculations');

export default Calculations;