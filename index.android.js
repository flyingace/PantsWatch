'use strict';

import React from 'react';
import {
    AppRegistry,
    StatusBar
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

AppRegistry.registerComponent('PantsWatch', () => PantsWatch);
