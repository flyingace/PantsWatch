import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import * as PantsListActions from '../actions/PantsListActions';
import PantsListView from '../components/PantsListView';

function mapStateToProps(state) {
    return {
        pantsList: state.pantsListReducer
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(PantsListActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PantsListView);
