import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import * as FormActions from '../actions/FormActions';
import PantsForm from '../components/PantsForm';

function mapStateToProps(state) {
    return {
        pantsName: state.formReducer.pantsName,
        pantsColor: state.formReducer.pantsColor
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(FormActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PantsForm);
