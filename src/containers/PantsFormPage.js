import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as FormActions from '../actions/FormActions';
import PantsForm from '../components/PantsForm';

function mapStateToProps(state) {
    return {
        brandValues: state.formReducer.brandValues,
        colorValues: state.formReducer.colorValues,
        styleValues: state.formReducer.styleValues,
        pantsBrand: state.formReducer.pantsBrand,
        pantsColor: state.formReducer.pantsColor,
        pantsName: state.formReducer.pantsName,
        pantsStyle: state.formReducer.pantsStyle,
        pantsWearLimit: state.formReducer.pantsWearLimit
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(FormActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PantsForm);
