'use strict';

var React = require('react-native');
var {
    AppRegistry,
    StyleSheet,
    View
    } = React;
var PantsListView = require('./components/PantsListView/PantsListView')

var PantsWatch = React.createClass({
    render: function () {
        return (
            <View style={styles.container}>
                <PantsListView />
            </View>
        );
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    }
});

AppRegistry.registerComponent('PantsWatch', () => PantsWatch);
