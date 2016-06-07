import * as api from '../api/calculation';

import {
    NORMAL_INCOME_CHANGED
} from './action-list';

export const normalIncomeChanged = (value) => (dispatch) => {
    api.getCalculation()
}
