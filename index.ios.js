'use strict';

import React from 'react';
import {
    AppRegistry,
    StatusBar,
    StyleSheet,
    View
} from 'react-native';
import Application from './components/Application';

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

const styles = StyleSheet.create({
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
