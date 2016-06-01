import {combineReducers} from 'redux';

import calculations from './calculations';

export function getCombinedReducer() {
    return combineReducers({
        calculations
    });
}
