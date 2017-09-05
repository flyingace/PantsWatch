import React from 'react';
import PropTypes from 'prop-types';
import {
    View
} from 'react-native';
import MainPantsImage from './MainPantsImage';
import ActionBar from './ActionBar';
import PantsInfo from './PantsInfo';

class PantsDetail extends React.Component {

    static propTypes = {
    };

    static defaultProps = {
    };

    state = {
    };

    render () {

        const { pantsName, pantsColor, pantsBrand, pantsStyle, pantsWearCount, pantsWearLimit, lastWornDate, selected, _id } = this.props.navigation.state.params;
        return (
            <View>
                <MainPantsImage pantsName = {pantsName} />
                <ActionBar />
                <PantsInfo { ...this.props}  />
            </View>
        );
    }
}

module.exports = PantsDetail;