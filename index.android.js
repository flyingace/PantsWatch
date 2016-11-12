'use strict';

const React = require('react');
const {
    AppRegistry,
    StatusBar
} = require('react-native');
const Application = require('./components/Application');

const PantsWatch = React.createClass({


    componentWillMount: function () {
        StatusBar.setHidden(true);
    },

    render: function () {
        return (
            <Application />
        );
    }
});

AppRegistry.registerComponent('PantsWatch', () => PantsWatch);
