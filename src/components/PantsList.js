'use strict';

import React from 'react';
import {
    Alert,
    StyleSheet,
    TouchableOpacity,
    ListView,
    View
} from 'react-native';
import PantsFormPage from '../containers/PantsFormPage';
import PantsListRow from './PantsListRow';
import PantsSelectionModal from './PantsSelectionModal';

let pantsId;

const PantsList = React.createClass({

    displayName: 'PantsList',

    propTypes: {
        selectPants: React.PropTypes.func,
        washPants: React.PropTypes.func,
        deletePants: React.PropTypes.func,
        dataSource: React.PropTypes.object
    },

    getInitialState () {
        return {
            modalIsOpen: false,
            selectedPants: ''
        };
    },

    onRowPress (pantsData) {
        pantsId = pantsData._id;
        this.setState({modalIsOpen: true});
    },

    onPantsSelection () {
        this.props.selectPants(pantsId);
        this.closeModal();
    },

    onPantsWash () {
        this.props.resetWearCount(pantsId);
        this.closeModal();
    },

    onPantsEdit () {
        this.props.navigator.replace({component: PantsFormPage, name: 'Update Pants', updateId: pantsId})
    },

    onPantsDelete () {
        this.props.deletePants(pantsId);
        this.closeModal();
    },

    openModal () {
        this.setState({modalIsOpen: true});
    },

    closeModal () {
        this.setState({modalIsOpen: false});
    },

    renderPantsList (pantsData) {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => this.onRowPress(pantsData)}>
                <PantsListRow {...pantsData} style={{overflow: 'hidden'}}/>
            </TouchableOpacity>
        );
    },

    render () {
        return (
            <View>
                <ListView
                    removeClippedSubviews={true}
                    dataSource={this.props.dataSource}
                    renderRow={this.renderPantsList}
                    style={{height: this.props.height}}
                    enableEmptySections={true}
                />
                <PantsSelectionModal
                    isVisible={this.state.modalIsOpen}
                    onPantsSelection = {this.onPantsSelection}
                    onPantsWash = {this.onPantsWash}
                    onPantsEdit = {this.onPantsEdit}
                    onPantsDelete = {this.onPantsDelete}
                    onRequestClose={this.closeModal}
                />
            </View>
        );
    }
});

module.exports = PantsList;
