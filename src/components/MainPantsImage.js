import React from 'react';
import PropTypes from 'prop-types';
import {
    Image,
    Text,
    View
} from 'react-native';
import PantsThumb from '../../assets/PantsThumb.png';

class MainPantsImage extends React.Component {

    static propTypes = {
    };

    static defaultProps = {
        pantsImageSrc: { PantsThumb }
    };

    state = {};

    render() {
        return (
            <View>
                <Image source={require('../../assets/PantsPlaceholder.png')} resizeMode={ Image.resizeMode.contain } style={{width:200, margin:0, padding: 0, top: 0, right: 0}} />
                <Text>Main Pants Image</Text>
                <Text>Pants Name</Text>
            </View>
        );
    }
}

module.exports = MainPantsImage;