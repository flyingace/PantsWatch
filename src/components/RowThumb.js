import React from 'react';
import {
    Image,
    View
} from 'react-native';

const RowThumb = (props) => {
    return (
        <Image source={require('../../assets/PantsPlaceholder.png')} resizeMode={'contain'} style={{width: 100, height: 80, backgroundColor: '#CCC'}}/>
    )
};

export default RowThumb;

//TODO: Fix default image