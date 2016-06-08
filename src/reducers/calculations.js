import {getDefaultState} from '../state/state';
import calculationType from '../state/types/calculation';

function setCalculation(state, action) {
    return calculationType(action.calculation);
}

function normalIncomeChanged(state, action) {
    const numericValue = Number(action.value);

    return Object.assign({}, state, {
        [action.id]: numericValue
    });
}

export default (state = getDefaultState().calculation, action) => {
    const actionHandlers = {
        'CALCULATION_LOADED': setCalculation,
        'NORMAL_INCOME_CHANGED': normalIncomeChanged
    };
    const reducer = actionHandlers[action.type];

    return reducer ? reducer(state, action) : state;
};
