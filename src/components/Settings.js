import React from 'react';
import PropTypes from 'prop-types';
import {
    Text,
    View
} from 'react-native';

class Settings extends React.Component {


    getDefaultProps() {
    }

    getInitialState() {
        return null;
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <View>
                <Text>Settings</Text>
            </View>
        );
    }
}

Settings.propTypes = {};

module.exports = Settings;