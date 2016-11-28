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

import DB from '../../db.js';
import { DBEvents } from 'react-native-db-models';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

const PantsList = React.createClass({

    displayName: 'PantsList',

    propTypes: {
        dataSource: React.PropTypes.object
    },

    getDefaultProps() {
        return {
            // pantsName: 'Favorite Pants',
            // pantsColor: 'Blue',
            // pantsStyle: 'Casual',
            // pantsBrand: 'Levis',
            // pantsWearLimit: 6
        };
    },

    getInitialState () {

        return {
            loaded: true,
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
        if (!this.state.loaded) {
            return false;
        }

        return (
            <View>
                <ListView
                    removeClippedSubviews={true}
                    dataSource={this.props.dataSource}
                    renderRow={this.renderPantsList}
                    style={{height: this.props.height}}
                />
                <PantsSelectionModal
                    isVisible={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                />
            </View>
        );
    }
});

const pantsListStyles = StyleSheet.create({
    pantsList: {}
});

module.exports = PantsList;
