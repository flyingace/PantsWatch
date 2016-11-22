import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import * as FormActions from '../actions/FormActions';
import PantsForm from '../components/PantsForm';

function mapStateToProps(state) {
    return {
        form: state.form
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(FormActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PantsForm);
