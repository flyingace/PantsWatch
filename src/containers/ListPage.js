import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import * as ListActions from '../actions/ListActions';
import PantsList from '../components/PantsList';

function mapStateToProps(state) {
    return {
        list: state.list
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ListActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PantsList);
