import React from 'react';
import PropTypes from 'prop-types';
import {
    View, Text
} from 'react-native';
import { List, ListItem } from 'react-native-elements';

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
        const lastWornOn = (lastWornDate === '') ? 'Not worn yet' : lastWornDate;

        return (
            <List>
                <ListItem
                    title='Color'
                    rightTitle={pantsColor}
                    hideChevron/>
                <ListItem
                    title='Brand'
                    rightTitle={pantsBrand}
                    hideChevron/>
                <ListItem
                    title='Style'
                    rightTitle={pantsStyle}
                    hideChevron/>
                <ListItem
                    title='Wear Count'
                    rightTitle={pantsWearLimit.toString()}
                    hideChevron/>
                <ListItem
                    title='Wear Limit'
                    rightTitle={pantsWearLimit.toString()}
                    hideChevron/>
                <ListItem
                    title='Last Worn On'
                    rightTitle={lastWornOn}
                    hideChevron/>
            </List>
        );
    }
}

module.exports = PantsInfo;