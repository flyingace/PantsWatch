import React from 'react';
import {
    AppRegistry,
    StatusBar
} from 'react-native';
import Application from './src/components/Application';

class PantsWatch extends React.Component {


    componentWillMount() {
        StatusBar.setHidden(true);
    }

    render() {
        return (
            <Application />
        );
    }
}

AppRegistry.registerComponent('PantsWatch', () => PantsWatch);
