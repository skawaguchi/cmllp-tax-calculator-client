import React, {Component, PropTypes} from 'react';
import {Provider} from 'react-redux';
import {IntlProvider} from 'react-intl';

import * as content from './i18n/en';

import {createStore} from './store/store-creator';


class AppProvider extends Component {

    render() {
        return (
            <div>HIIII</div>
        );
    }
}

AppProvider.displayName = 'AppProvider';

export default AppProvider;
