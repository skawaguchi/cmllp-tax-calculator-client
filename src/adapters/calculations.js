export function adaptCalculations(attribute, newValue, state) {
    return Object.assign({}, state, {[attribute]: newValue});
}
