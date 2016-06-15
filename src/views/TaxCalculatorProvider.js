import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {IntlProvider} from 'react-intl';

import {getCombinedReducer} from '../reducers/index';
import {configureStore} from '../store/store-creator';
import TaxCalculatorRoutes from './TaxCalculatorRoutes';
import * as translations from '../i18n/en';

class TaxCalculatorProvider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            locale: 'en'
        };
    }

    componentWillMount() {
        const reducer = getCombinedReducer();
        const store = configureStore(reducer);

        this.setState({
            store,
            translations
        });

        if (process.env.NODE_ENV !== 'production') {
            const showDevTools = require('../show-dev-tools').default;
            showDevTools(store);
        }

    }

    render() {
        return (
            <IntlProvider
                locale={this.state.locale}
                messages={this.state.translations.default}
            >
                <Provider
                    store={this.state.store}
                >
                    <TaxCalculatorRoutes />
                </Provider>
            </IntlProvider>
        );
    }
}

TaxCalculatorProvider.displayName = 'TaxCalculatorProvider';

export default TaxCalculatorProvider;
