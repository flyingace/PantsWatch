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
        return (
            <View>
                <MainPantsImage />
                <ActionBar />
                <PantsInfo />
            </View>
        );
    }
}

module.exports = PantsDetail;