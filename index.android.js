'use strict';

import React from 'react';
import {
    AppRegistry,
    StatusBar
} from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './src/store/configureStore';
import Application from './src/components/Application';
import { StackNavigator } from 'react-navigation';

const store = configureStore();

class PantsWatch extends React.Component {

    componentWillMount() {
        StatusBar.setHidden(true);
    }

    render() {
        return (
            <Provider store={ store }>
                <Application />
            </Provider>
        );
    }
}

AppRegistry.registerComponent('PantsWatch', () => PantsWatch);