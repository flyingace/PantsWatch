'use strict';

import React from 'react';
import {
    AppRegistry,
    StatusBar
} from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './src/store/configureStore';
import Application from './src/components/Application';

const store = configureStore();

const PantsWatch = React.createClass({


    componentWillMount: function () {
        StatusBar.setHidden(true);
    },

    render: function () {
        return (
            <Provider store={ store }>
                <Application />
            </Provider>
        );
    }
});

AppRegistry.registerComponent('PantsWatch', () => PantsWatch);