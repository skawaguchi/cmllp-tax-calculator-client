import Chance from 'chance';
import {shallow} from 'enzyme';
import React from 'react';
import test from 'ava';

import {CalculationOutput} from '../../../src/views/CalculationOutput';

let chance;

function setupTest() {
    const fakeCalculations = {
        federalEligibleDividendTaxCredit: chance.floating(),
        totalTaxCredits: chance.floating(),
        totalTaxes: chance.floating()
    };

    const component = shallow(
        <CalculationOutput
            calculations={fakeCalculations}
        />
    );

    return {
        component,
        fakeCalculations
    };
}

test.before(() => {
    chance = new Chance();
});

function testOutput(t, component, description, elementSelector, labelKey, value) {
    t.is(component.find(elementSelector).length, 1, `should have a ${ description } output to display`);
    t.is(component.find(elementSelector).prop('labelKey'), labelKey, `should display the ${ description } label`);
    t.is(component.find(elementSelector).prop('value'), value, `should display the ${ description } value`);
}

test('should render the component', (t) => {
    const testItems = setupTest();

    t.is(testItems.component.type(), 'section');
    t.is(testItems.component.hasClass('calculation-output'), true);
});

test('should render the component', (t) => {
    const testItems = setupTest();

    testOutput(t, testItems.component, 'total taxes', '.total-taxes', 'labels.totalTaxes', testItems.fakeCalculations.totalTaxes);

    testOutput(t, testItems.component, 'federal eligible dividend tax credit', '.federal-eligible-dividend-tax-credit', 'labels.federalEligibleDividendTaxCredit', testItems.fakeCalculations.federalEligibleDividendTaxCredit);

    testOutput(t, testItems.component, 'federal ineligible dividend tax credit', '.federal-ineligible-dividend-tax-credit', 'labels.federalIneligibleDividendTaxCredit', testItems.fakeCalculations.federalIneligibleDividendTaxCredit);

    testOutput(t, testItems.component, 'provincial eligible dividend tax credit', '.provincial-eligible-dividend-tax-credit', 'labels.provincialEligibleDividendTaxCredit', testItems.fakeCalculations.provincialEligibleDividendTaxCredit);

    testOutput(t, testItems.component, 'provincial ineligible dividend tax credit', '.provincial-ineligible-dividend-tax-credit', 'labels.provincialIneligibleDividendTaxCredit', testItems.fakeCalculations.provincialIneligibleDividendTaxCredit);

    testOutput(t, testItems.component, 'total tax credits', '.total-tax-credits', 'labels.totalTaxCredits', testItems.fakeCalculations.totalTaxCredits);

    testOutput(t, testItems.component, 'income after taxes', '.income-after-taxes', 'labels.incomeAfterTaxes', testItems.fakeCalculations.incomeAfterTaxes);

    testOutput(t, testItems.component, 'average tax rate', '.average-tax-rate', 'labels.averageTaxRate', testItems.fakeCalculations.averageTaxRate);

    testOutput(t, testItems.component, 'marginal tax rate', '.marginal-tax-rate', 'labels.marginalTaxRate', testItems.fakeCalculations.marginalTaxRate);
});
