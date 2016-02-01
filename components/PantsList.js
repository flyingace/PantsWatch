'use strict';

var React = require('react-native');
const {
    StyleSheet,
    TouchableOpacity,
    ListView
    } = React;
const PantsListRow = require('./PantsListRow');

const DB = require('../db.js');
const DBEvents = require('react-native-db-models').DBEvents;

let pantsData = require('../pants_data.json');

const PantsList = React.createClass({

    displayName: 'MaxWearsBox',

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
        var rowSource;
        DB.pants.get_all(function (result) {
            rowSource = (result.length > 0) ? result.rows : pantsData.pants;
            self.setState({
                dataSource: self.state.dataSource.cloneWithRows(rowSource),
                loaded: true
            });
            console.log(result);
        });
    },

    onRowPress: function () {
        console.log('press')
    },

    renderPantsList: function (pants) {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={this.onRowPress}>
                <PantsListRow {...pants} style={{overflow: 'hidden'}}/>
            </TouchableOpacity>
        );
    },

    render: function () {
        if (!this.state.loaded) {
            return false;
        }

        return (
            <ListView
                removeClippedSubviews={true}
                dataSource={this.state.dataSource}
                renderRow={this.renderPantsList}
                style={{height: this.props.height}}
            />
        );
    }
});

var pantsListStyles = StyleSheet.create({
    pantsList: {}
});

module.exports = PantsList;
