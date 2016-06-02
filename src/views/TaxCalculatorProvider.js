import React, {Component, PropTypes} from 'react';
import {Provider} from 'react-redux';
import {Router, Route, browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';

import {getCombinedReducer} from '../reducers/index';
import {createStore} from '../store/store-creator';
import TaxCalculatorContainer from './TaxCalculatorContainer';

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
                <Router history={syncHistoryWithStore(browserHistory, this.state.store)}>
                    <Route path=":province" component={TaxCalculatorContainer} />
                </Router>
            </Provider>
        );
    }
}

TaxCalculatorProvider.displayName = 'TaxCalculatorProvider';

export default TaxCalculatorProvider;
