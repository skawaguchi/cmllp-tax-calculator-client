import {getDefaultState} from '../state/state';
import Inputs from '../state/types/inputs';

function normalIncomeChanged(state, action) {
    const numericValue = action.isString ? action.value : Number(action.value);
    const stateUpdates = {
        [action.id]: {$set: numericValue}
    };

    return Inputs.update(state, stateUpdates);
}

export default (state = getDefaultState().inputs, action) => {
    const actionHandlers = {
        'INPUT_CHANGED': normalIncomeChanged
    };
    const reducer = actionHandlers[action.type];

    return reducer ? reducer(state, action) : state;
};
