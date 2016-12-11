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
        dataSource: React.PropTypes.object
    },

    getInitialState () {
        return {
            modalIsOpen: false
        };
    },

    onRowPress () {
        Alert.alert(
            'Choose Your Pants',
            'Are you wearing these pants today?',
            [
                {text: 'Nope', onPress: () => console.log('Not wearing pants'), style: 'cancel'},
                {text: 'Absolutely', onPress: () => console.log('Absolutely wearing these pants today')},
            ]
        )
    },

    openModal () {
        this.setState({modalIsOpen: true});
    },

    closeModal () {
        this.setState({modalIsOpen: false});
    },

    renderPantsList (pants) {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={this.onRowPress}>
                <PantsListRow {...pants} style={{overflow: 'hidden'}}/>
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
