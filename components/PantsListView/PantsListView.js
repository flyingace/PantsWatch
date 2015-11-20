/*globals */

'use strict';

var React = require('react-native');
const {
    StyleSheet,
    View,
    ListView,
    ListViewDataSource
    } = React;
const PantsListRow = require('../PantsListRow/PantsListRow');

var pantsData = require('../../pants_data.json');

var PantsListView = React.createClass({

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
            dataSource: new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2,
    }),
            loaded: true
        };
    },

    componentDidMount: function () {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(pantsData.pants),
            loaded: true,
        });
    },

    fetchData: function () {
        // fetch(pantsData)
        //    .then((response) => response.json())
        //    .then((responseData) => {
        //        this.setState({
        //            dataSource: this.state.dataSource.cloneWithRows(pantsData.pants),
        //            loaded: true
        //        });
        //    })
        //    .done();
    },

    renderPantsList: function (pants) {
        return (
            <PantsListRow {...pants}/>
        );
    },

    render: function () {
        // if (!this.state.loaded) {
        //    return false;
        // }

        console.log(this.state.dataSource);
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderPantsList}
            />
        );
    }
});

var styles = StyleSheet.create({
    pantsRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'lightblue',
        alignSelf: 'stretch'
    },
    pantsThumb: {
        width: 50,
        height: 50
    },
    pantsName: {
        fontSize: 20,
        textAlign: 'center'
    },
    colorName: {
        fontSize: 14,
        textAlign: 'center'
    },
    styleName: {
        fontSize: 14,
        textAlign: 'center',
        color: '#333333'
    },
    wearLimit: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'red'
    }
});

module.exports = PantsListView;
