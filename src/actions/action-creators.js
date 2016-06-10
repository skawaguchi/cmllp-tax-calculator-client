import {performCalculation} from '../api/performCalculation';

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
                throw new Error('Calculation request failed.');
            }
        })
        .catch((error) => {
            throw error;
        });

};

export const setProvince = (province) => (dispatch) => {
    dispatch({
        id: 'province',
        isString: true,
        type: 'INPUT_CHANGED',
        value: province
    });
};

export const setYear = (year) => (dispatch) => {
    dispatch({
        id: 'year',
        isString: true,
        type: 'YEAR_CHANGED',
        value: year
    });
};

