import React from 'react';
import {
    StyleSheet,
} from 'react-native';
import { Tile } from 'react-native-elements';
import PantsPlaceholder from '../../../assets/PantsPlaceholder.png';

const MainPantsImage = (props) => {

    const styles = StyleSheet.create({
        tileStyle: {
            justifyContent: 'flex-end'
        }
    });

    return (
        <Tile
            imageSrc={props.pantsImageSrc}
            title={props.pantsName}
            overlayContainerStyle={styles.tileStyle}
            featured
        />
    );
};

MainPantsImage.defaultProps = {pantsImageSrc: PantsPlaceholder};

export default MainPantsImage;