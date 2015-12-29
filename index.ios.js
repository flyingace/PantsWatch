'use strict';

var React = require('react-native');
var {
    AppRegistry,
    StatusBarIOS,
    StyleSheet,
    View
    } = React;
const SideMenu = require('react-native-side-menu');
const Application = require('./components/Application/Application');

var PantsWatch = React.createClass({

    componentWillMount: function () {
        StatusBarIOS.setHidden(true);
    },

    render: function () {
        return (
                <Application />
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
