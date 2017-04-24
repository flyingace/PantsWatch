import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import * as FormActions from '../actions/FormActions';
import PantsForm from '../components/PantsForm';

function mapStateToProps(state) {
    return {
        pantsName: state.pantsName,
        pantsColor: state.pantsColor
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(FormActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PantsForm);
