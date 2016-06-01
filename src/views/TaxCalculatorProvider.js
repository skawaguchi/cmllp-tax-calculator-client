import React, {Component, PropTypes} from 'react';
import {Provider} from 'react-redux';
// import {IntlProvider} from 'react-intl';

// import * as messages from '../i18n/en';

import {getCombinedReducer} from '../reducers/index';
import {createStore} from '../store/store-creator';
// import TaxCalculator from './TaxCalculator';

class TaxCalculatorProvider extends Component {

    componentWillMount() {
        const reducer = getCombinedReducer();
        const store = createStore(reducer);

        this.setState({
            store
        })
    }

    render() {
        return (
            <Provider store={this.state.store}>
            </Provider>
        );
    }
}

TaxCalculatorProvider.displayName = 'TaxCalculatorProvider';

export default TaxCalculatorProvider;
