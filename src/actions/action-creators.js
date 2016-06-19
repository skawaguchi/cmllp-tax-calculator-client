import {browserHistory} from 'react-router';

import {performCalculation} from '../api/perform-calculation';

export const changeInput = (id, value) => (dispatch) => {
    dispatch({
        id,
        type: 'INPUT_CHANGED',
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
                throw 'Calculation request failed.';
            }
        })
        .catch((error) => {
            throw error;
        });

};

export const setProvince = (province) => (dispatch) => {
    browserHistory.push(`/tax-calculator/${province}`);

    dispatch({
        province,
        type: 'PROVINCE_CHANGED'
    });
};

export const setYear = (year) => (dispatch) => {
    dispatch({
        type: 'YEAR_CHANGED',
        year: year
    });
};

