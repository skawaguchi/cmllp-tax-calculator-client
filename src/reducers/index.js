import {combineReducers} from 'redux';

import calculations from './calculations';
import inputs from './inputs';

export function getCombinedReducer() {
    return combineReducers({
        calculations,
        inputs
    });
}
