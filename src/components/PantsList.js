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
            loaded: true
        };
    },

    componentDidMount () {
        // let self = this;
        // DBEvents.on('all', function () {
        //     self.getAllPants();
        // });
        //
        // this.getAllPants();
    },

    getAllPants () {
        // const self = this;
        // let rowSource;
        // DB.pants.get_all(function (result) {
        //     // rowSource = (result.totalrows > 0) ? result.rows : pantsData.pants;
        //     self.setState({
        //         dataSource: ds.cloneWithRows(result.rows),
        //         loaded: true
        //     });
        //     console.log(result.rows);
        // });
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
