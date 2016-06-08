export const changeNormalIncome = (id, value) => (dispatch) => {
    dispatch({
        id,
        type: 'NORMAL_INCOME_CHANGED',
        value
    });
};
