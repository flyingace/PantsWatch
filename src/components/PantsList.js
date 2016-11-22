'use strict';

import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    ListView,
    View
} from 'react-native';
import PantsListRow from './PantsListRow';
import PantsSelectionModal from './PantsSelectionModal';

import DB from '../../db.js';
import { DBEvents } from 'react-native-db-models';

const PantsList = React.createClass({

    displayName: 'PantsList',

    propTypes: {
        pantsData: React.PropTypes.object
    },

    getDefaultProps() {
        return {
            pantsName: 'Favorite Pants',
            colorName: 'Blue',
            styleName: 'Casual',
            wearLimit: 6
        };
    },

    getInitialState () {
        return {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            }),
            loaded: true
        };
    },

    componentDidMount () {
        let self = this;
        DBEvents.on('all', function () {
            self.getAllPants();
        });

        this.getAllPants();
    },

    getAllPants () {
        const self = this;
        let rowSource;
        DB.pants.get_all(function (result) {
            // rowSource = (result.totalrows > 0) ? result.rows : pantsData.pants;
            self.setState({
                dataSource: self.state.dataSource.cloneWithRows(result.rows),
                loaded: true
            });
            console.log(result);
        });
    },

    onRowPress () {
        console.log('press')
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
                <PantsSelectionModal />
            </View>
        );
    }
});

const pantsListStyles = StyleSheet.create({
    pantsList: {}
});

module.exports = PantsList;
