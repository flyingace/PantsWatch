'use strict';

import React from 'react';
import {
    Alert,
    StyleSheet,
    TouchableOpacity,
    ListView,
    View
} from 'react-native';
import PantsListRow from './PantsListRow';
import PantsSelectionModal from './PantsSelectionModal';

const PantsList = React.createClass({

    displayName: 'PantsList',

    propTypes: {
        selectPants: React.PropTypes.func,
        dataSource: React.PropTypes.object
    },

    getInitialState () {
        return {
            modalIsOpen: false
        };
    },

    onRowPress (pantsData) {
        const pantsId = pantsData._id;
        Alert.alert(
            'Choose Your Pants',
            'Are you wearing these pants today?',
            [
                {text: 'Nope', onPress: () => console.log('Not wearing pants'), style: 'cancel'},
                {text: 'Absolutely', onPress: () => this.onPantsSelection(pantsId)},
            ]
        )
    },

    onPantsSelection (pantsId) {
        this.props.selectPants(pantsId);
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
                    onRequestClose={this.closeModal}
                />
            </View>
        );
    }
});

module.exports = PantsList;
