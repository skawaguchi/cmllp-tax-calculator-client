import {performCalculation} from '../api/performCalculation';

export const changeNormalIncome = (id, value) => (dispatch) => {
    dispatch({
        id,
        type: 'NORMAL_INCOME_CHANGED',
        value
    });
};

export const getCalculations = () => async function (dispatch, getState) {
    const state = getState();
    const requestBody = state.inputs;

    await performCalculation(requestBody)
        .then((response) => {
            if (response.ok) {
                response.json()
                    .then((calculations) => {
                        dispatch({
                            calculations,
                            type: 'CALCULATION_LOADED'
                        });
                    })
                    .catch((error) => {
                        throw error;
                    });
            } else {
                throw new Error('Calculation request failed.');
            }
        })
        .catch((error) => {
            throw error;
        });

};

export const setProvince = (province) => (dispatch) => {
    dispatch({
        type: 'PROVINCE_CHANGED',
        province
    });
};

export const setYear = (year) => (dispatch) => {
    dispatch({
        type: 'YEAR_CHANGED',
        year
    });
};

