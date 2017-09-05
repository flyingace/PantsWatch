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

        const { pantsColor, pantsBrand, pantsStyle, pantsWearCount, pantsWearLimit, lastWornDate, selected, _id } = this.props.navigation.state.params;

        return (
            <View>
                <Text>Color: {pantsColor}</Text>
                <Text>Brand: {pantsBrand}</Text>
                <Text>Style: {pantsStyle}</Text>
                <Text>Wear Count/Limit: {pantsWearCount} / {pantsWearLimit}</Text>
                <Text>Last Worn On: {lastWornDate}</Text>
            </View>
        );
    }
}

module.exports = PantsInfo;