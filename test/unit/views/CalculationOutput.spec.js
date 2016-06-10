import Chance from 'chance';
import {shallow} from 'enzyme';
import React from 'react';
import test from 'tape';

import {CalculationOutput} from '../../../src/views/CalculationOutput';

let chance;

function setup() {
    chance = new Chance();
}

/* eslint-disable max-statements */

function testOutput(t, component, description, elementSelector, labelKey, value) {
    t.equal(component.find(elementSelector).length, 1, `should have a ${ description } output to display`);
    t.equal(component.find(elementSelector).prop('labelKey'), labelKey, `should display the ${ description } label`);
    t.equal(component.find(elementSelector).prop('value'), value, `should display the ${ description } value`);
}

test('# CalculationOutput > Given the component has rendered', (t) => {

    setup();

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

    t.equal(component.type(), 'section', 'should be a <section/>');
    t.equal(component.find('.calculation-output').length, 1, 'should have a css identifier');

    testOutput(t, component, 'total taxes', '.total-taxes', 'labels.totalTaxes', fakeCalculations.totalTaxes);

    testOutput(t, component, 'federal eligible dividend tax credit', '.federal-eligible-dividend-tax-credit', 'labels.federalEligibleDividendTaxCredit', fakeCalculations.federalEligibleDividendTaxCredit);

    testOutput(t, component, 'federal ineligible dividend tax credit', '.federal-ineligible-dividend-tax-credit', 'labels.federalIneligibleDividendTaxCredit', fakeCalculations.federalIneligibleDividendTaxCredit);

    testOutput(t, component, 'provincial eligible dividend tax credit', '.provincial-eligible-dividend-tax-credit', 'labels.provincialEligibleDividendTaxCredit', fakeCalculations.provincialEligibleDividendTaxCredit);

    testOutput(t, component, 'provincial ineligible dividend tax credit', '.provincial-ineligible-dividend-tax-credit', 'labels.provincialIneligibleDividendTaxCredit', fakeCalculations.provincialIneligibleDividendTaxCredit);

    testOutput(t, component, 'total tax credits', '.total-tax-credits', 'labels.totalTaxCredits', fakeCalculations.totalTaxCredits);

    testOutput(t, component, 'income after taxes', '.income-after-taxes', 'labels.incomeAfterTaxes', fakeCalculations.incomeAfterTaxes);

    t.end();

});
