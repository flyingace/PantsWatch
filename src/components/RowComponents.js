import React from 'react';
import PropTypes from 'prop-types';
import {
    Image,
    Text,
    View
} from 'react-native';

import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from '../config.json';
const Icon = createIconSetFromFontello(fontelloConfig);

export const RowThumb = (props) => {
    const thumbStyle = {flex: 0, width: 100, height: 80, backgroundColor: '#CCC'};

    return (
        <Image source={require('../../assets/PantsPlaceholder.png')} resizeMode={'contain'} style={thumbStyle}/>
    )
};

export const RowTitle = (props) => {
    const titleStyle = {fontSize: 24, textAlign: 'left', color: 'black', alignSelf: 'center'};

    return (
        <Text style={titleStyle}>{props.name}</Text>
    )
};

export const RowBadge = (props) => {
    const badgeColor = setBadgeColor(props.wearCount, props.wearLimit);
    const badgeStyle = {fontSize: 16, textAlign: 'center', color: 'white', backgroundColor: badgeColor, height: 32, width: 50, borderRadius: 16, alignSelf: 'flex-start', marginTop: 5, marginRight: 5, paddingTop: 4};

    return (
        <Text style={badgeStyle}>{props.wearCount}/{props.wearLimit}</Text>
    )
};

export const RowAttribute = (props) => {
    const iconColor = (props.icon === 'color_pallette') ? props.label.toLowerCase() : null;

    const attributeStyle = { flex: 1, fontSize: 16, textAlign: 'left', color: 'black', paddingRight: 5 };
    const iconStyle = {flex: 0, marginRight: 4, color: iconColor};

    return (
        <View style={{flex: 1, flexDirection: 'row'}}>
            <Icon name={props.icon} size={20} style={iconStyle} /><Text style={attributeStyle}>{props.label}</Text>
        </View>
    )
};

const setBadgeColor = (count, limit) => {
    const badgeColors = ['#009444', '#56A141', '#83B13B', '#ADC332', '#D7D71F', '#FFF200', '#F4C511', '#E69E20', '#DB7B24', '#D15526', '#C82127', '#842027'];
    const indx = Math.ceil((count/limit) * 10);

    return (indx <= 10) ? badgeColors[indx] : badgeColors[11];
};

