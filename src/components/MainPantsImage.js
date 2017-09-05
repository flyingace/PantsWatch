import React from 'react';
import PropTypes from 'prop-types';
import {
    Image,
    Text,
    View
} from 'react-native';
import { Tile } from 'react-native-elements';
import PantsPlaceholder from '../../assets/PantsPlaceholder.png';

class MainPantsImage extends React.Component {

    static propTypes = {};

    static defaultProps = {
        pantsImageSrc: PantsPlaceholder
    };

    state = {};

    render() {
        return (
            <Tile
                imageSrc={ this.props.pantsImageSrc }
                featured
                title={`${this.props.pantsName}`}
            />
        );
    }
}

module.exports = MainPantsImage;