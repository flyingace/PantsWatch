/*globals */

'use strict';

var React = require('react-native');
const {
    StyleSheet,
    ListView,
    } = React;
const PantsListRow = require('../PantsListRow/PantsListRow');
const DB = require('../../db.js');
const DBEvents = require('react-native-db-models').DBEvents;

let pantsData = require('../../pants_data.json');

const PantsListView = React.createClass({

    propTypes: {
        pantsData: React.PropTypes.object
    },

    getDefaultProps() {
        return {
            pantsName: 'Favorite Pants',
            colorName: 'Blue',
            styleName: 'Casual',
            wearLimit: 0
        };
    },

    getInitialState: function () {
        return {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            }),
            loaded: true
        };
    },

    componentDidMount: function () {
        let self = this;
        DBEvents.on('all', function () {
            self.getAllPants();
        });

        this.getAllPants();
    },

    getAllPants: function () {
        var self = this;
        DB.pants.get_all(function (result) {
            self.setState({
                dataSource: self.state.dataSource.cloneWithRows(result.rows),
                loaded: true
            });
            console.log(result);
        });
    },

    renderPantsList: function (pants) {
        return (
            <PantsListRow {...pants}/>
        );
    },

    render: function () {
        if (!this.state.loaded) {
            return false;
        }

        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderPantsList}
                style={styles.pantsList}
            />
        );
    }
});

var styles = StyleSheet.create({
    pantsList: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        alignSelf: 'stretch'
    }
});

module.exports = PantsListView;
