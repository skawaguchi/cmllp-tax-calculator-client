import {getDefaultState} from '../state/state';
import Inputs from '../state/types/inputs';

function normalIncomeChanged(state, action) {
    const numericValue = Number(action.value);
    const stateUpdates = {
        [action.id]: {$set: numericValue}
    };

    return Inputs.update(state, stateUpdates);
}

function provinceChanged(state, action) {
    const stateUpdates = {
        province: {$set: action.province}
    };

    return Inputs.update(state, stateUpdates);
}

function yearChanged(state, action) {
    const stateUpdates = {
        year: {$set: action.year}
    };

    return Inputs.update(state, stateUpdates);
}

export default (state = getDefaultState().inputs, action) => {
    const actionHandlers = {
        'NORMAL_INCOME_CHANGED': normalIncomeChanged,
        'PROVINCE_CHANGED': provinceChanged,
        'YEAR_CHANGED': yearChanged
    };
    const reducer = actionHandlers[action.type];

    return reducer ? reducer(state, action) : state;
};
