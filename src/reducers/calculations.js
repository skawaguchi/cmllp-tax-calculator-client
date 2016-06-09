import {getDefaultState} from '../state/state';
import Calculations from '../state/types/calculations';

function calculationLoaded(state, action) {
    const stateUpdates = {$set: action.calculations};

    return Calculations.update(state, stateUpdates);
}

export default (state = getDefaultState().calculations, action) => {
    const actionHandlers = {
        'CALCULATION_LOADED': calculationLoaded
    };
    const reducer = actionHandlers[action.type];

    return reducer ? reducer(state, action) : state;
};
