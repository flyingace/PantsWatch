'use strict';

var React = require('react-native');
var {
    AppRegistry,
    StatusBarIOS,
    StyleSheet,
    View
    } = React;
const PantsForm = require('./components/PantsForm/PantsForm');
const TabBar = require('./components/TabBar/TabBar');

var PantsWatch = React.createClass({

    componentWillMount: function () {
        StatusBarIOS.setHidden(true);
    },

    render: function () {
        return (
            <View style={styles.container}>
                <TabBar/>
            </View>
        );
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    }
});

AppRegistry.registerComponent('PantsWatch', () => PantsWatch);
