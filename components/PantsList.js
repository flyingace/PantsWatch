'use strict';

var React = require('react-native');
const {
    StyleSheet,
    TouchableOpacity,
    ListView
    } = React;
const PantsListRow = require('./PantsListRow');

import realm from '../realm.js';

let pantsData = require('../pants_data.json');

const PantsList = React.createClass({

    
    displayName: 'MaxWearsBox',

    propTypes: {
        pantsData: React.PropTypes.object
    },

    getDefaultProps() {
        return null
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
        realm.addListener('change', () => {
            self.getAllPants();
        });

        this.getAllPants();
    },

    getAllPants: function () {
        var self = this;
        let pants = realm.objects('Pants');
        let rowSource = (pants.length > 0) ? pants.rows : pantsData.pants;

        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(rowSource),
            loaded: true
        });
        console.log(pants);
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
