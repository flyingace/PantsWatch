import React from 'react';
import PropTypes from 'prop-types';
import {
    View, Text
} from 'react-native';

class PantsInfo extends React.Component {
    static propTypes = {};

    static defaultProps = {};

    state = {};

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <View>
                <Text>Color: Color</Text>
                <Text>Brand: Brand</Text>
                <Text>Style: Style</Text>
                <Text>Wear Count/Limit</Text>
                <Text>Last Worn On: Date</Text>
            </View>
        );
    }
}

module.exports = PantsInfo;