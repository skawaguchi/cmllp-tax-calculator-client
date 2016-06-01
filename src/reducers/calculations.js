import {getDefaultState} from '../state/state';
import calculationType from '../state/types/calculation';
import {CALCULATION_LOADED} from '../actions/action-list';

function setCalculation(state, action) {
    return calculationType(action.calculation);
}

export default (state = getDefaultState().calculation, action) => {
    const actionHandlers = {
        [CALCULATION_LOADED]: setCalculation
    };
    const reducer = actionHandlers[action.type];

    return reducer ? reducer(state, action) : state;
}
