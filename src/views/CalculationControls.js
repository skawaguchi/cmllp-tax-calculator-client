import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';

import CalculationInput from './CalculationInput';
import CalculationSelect from './CalculationSelect';
import {intlShape} from 'react-intl';

import {
    changeInput,
    getCalculations,
    setProvince,
    setYear
} from '../actions/action-creators';
import Inputs from '../state/types/inputs';
import {getProvinceList} from '../factories/province-list';
import {processLocation, getProvince} from '../services/ip-location';

const canadaCountryCode = 'CA';

function inputChanged(dispatch, id, value) {
    dispatch(changeInput(id, value));
    dispatch(getCalculations());
}

function provinceChanged(dispatch, event, province) {
    dispatch(setProvince(province));
    dispatch(getCalculations());
}

export class CalculationControls extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

        this.props.dispatch(setYear(moment().format('YYYY')));

        this.props.dispatch(setProvince(this.props.params.province));

    }

    render() {

        const provinceOptions = getProvinceList();

        return (
            <section className='calculation-controls'>

                <CalculationSelect
                    changeHandler={provinceChanged.bind(null, this.props.dispatch)}
                    intl={this.context.intl}
                    labelKey='labels.province'
                    options={provinceOptions}
                    selectID='province-select-control'
                    selectedValue={this.props.inputs.province}
                />

                <CalculationInput
                    changeHandler={inputChanged.bind(null, this.props.dispatch)}
                    className='normal-income-input'
                    inputID='normalIncome'
                    inputValue={this.props.inputs.normalIncome}
                    labelKey='labels.normalIncome'
                />

                <CalculationInput
                    changeHandler={inputChanged.bind(null, this.props.dispatch)}
                    className='capital-gains-input'
                    inputID='capitalGains'
                    inputValue={this.props.inputs.capitalGains}
                    labelKey='labels.capitalGains'
                />

                <CalculationInput
                    changeHandler={inputChanged.bind(null, this.props.dispatch)}
                    className='eligible-dividends-input'
                    inputID='eligibleDividends'
                    inputValue={this.props.inputs.eligibleDividends}
                    labelKey='labels.eligibleDividends'
                />

                <CalculationInput
                    changeHandler={inputChanged.bind(null, this.props.dispatch)}
                    className='ineligible-dividends-input'
                    inputID='ineligibleDividends'
                    inputValue={this.props.inputs.ineligibleDividends}
                    labelKey='labels.ineligibleDividends'
                />

                <CalculationInput
                    changeHandler={inputChanged.bind(null, this.props.dispatch)}
                    className='rrsp-contributions-input'
                    inputID='rrspContributions'
                    inputValue={this.props.inputs.rrspContributions}
                    labelKey='labels.rrspContributions'
                />

                <CalculationInput
                    changeHandler={inputChanged.bind(null, this.props.dispatch)}
                    className='taxes-already-paid-input'
                    inputID='taxesAlreadyPaid'
                    inputValue={this.props.inputs.taxesAlreadyPaid}
                    labelKey='labels.taxesAlreadyPaid'
                />

            </section>
        );
    }
}

CalculationControls.propTypes = {
    dispatch: PropTypes.func.isRequired,
    inputs: PropTypes.instanceOf(Inputs).isRequired,
    params: PropTypes.object.isRequired,
    selectedProvince: PropTypes.string
};

CalculationControls.contextTypes = {
    intl: intlShape
};

const mapStateToProps = (state) => ({
    inputs: state.inputs,
    selectedProvince: state.selectedProvince
});

export default connect(mapStateToProps)(CalculationControls);
