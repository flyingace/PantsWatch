import React from 'react';
import PropTypes from 'prop-types';
import {
    View, Text
} from 'react-native';

class MainPantsImage extends React.Component {
    constructor() {
        super();
    };

    static propTypes = {};

    static defaultProps = {};

    state = {};

    render() {
        return (
            <View>
                <Text>Main Pants Image</Text>
                <Text>Pants Name</Text>
            </View>
        );
    }
}

module.exports = MainPantsImage;