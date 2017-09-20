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

export const DetailTile = (props) => {
    const imageStyle = {flex: 1, flexDirection: 'row', alignItems: 'flex-end', height: 280, backgroundColor: '#CCC', overflow:'visible'};
    const titleStyle = {flex: 1, fontSize: 45, textAlign: 'left', color: 'black', backgroundColor: 'rgba(255,255,255,.4)', paddingLeft: 10};

    return (
        <Image source={require('../../assets/PantsPlaceholder.png')} resizeMode={'contain'} style={imageStyle}>
            <Text style={titleStyle}>{props.name}</Text>
        </Image>
    )
};

export const DetailTitle = (props) => {
    const titleStyle = {fontSize: 24, textAlign: 'left', color: 'black', alignSelf: 'center'};

    return (
        <Text style={titleStyle}>{props.name}</Text>
    )
};

export const DetailBadge = (props) => {
    const badgeColor = setBadgeColor(props.wearCount, props.wearLimit);
    const badgeStyle = {fontSize: 16, textAlign: 'center', color: 'white', backgroundColor: badgeColor, height: 32, width: 50, borderRadius: 16, alignSelf: 'flex-start', marginTop: 5, marginRight: 5, paddingTop: 4};

    return (
        <Text style={badgeStyle}>{props.wearCount}/{props.wearLimit}</Text>
    )
};

export const DetailAttribute = (props) => {
    const iconColor = (props.icon === 'color_pallette') ? props.value.toLowerCase() : null;

    const rowStyle = {flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', height: 50, marginBottom: 2, paddingLeft: 10, paddingRight: 10, backgroundColor: 'white'};
    const iconStyle = {flex: 0, marginRight: 5, color: iconColor};
    const labelStyle = { flex: 0, width: 200, fontSize: 20, textAlign: 'left', color: 'grey', paddingRight: 30 };
    const valueStyle = { flex: 2, fontSize: 20, textAlign: 'right', color: 'black' };

    return (
        <View style={rowStyle}>
            <Icon name={props.icon} size={20} style={iconStyle} />
            <Text style={labelStyle}>{props.label}:</Text>
            <Text style={valueStyle}>{props.value}</Text>
            {optionallyRenderColorCircle(props.label, props.value, props.limit)}

        </View>
    )
};

const setBadgeColor = (count, limit) => {
    const badgeColors = ['#009444', '#56A141', '#83B13B', '#ADC332', '#D7D71F', '#FFF200', '#F4C511', '#E69E20', '#DB7B24', '#D15526', '#C82127', '#842027'];
    const indx = Math.ceil((count/limit) * 10);

    return (indx <= 10) ? badgeColors[indx] : badgeColors[11];
};

const optionallyRenderColorCircle = (label, value, wearLimit) => {
    let iconColor;

    switch (label) {
    case 'Color':
        iconColor = value.toLowerCase();
        break;
    case 'Wear Count':
        iconColor = setBadgeColor(value, wearLimit);
        console.log(wearLimit);
        break;
    case 'Wear Limit':
        iconColor = setBadgeColor(value, value);
        break;
    default:
        iconColor = 'rgba(255,255,255,0)';
    }

    return (
        <Icon name={'circle'} color={iconColor} style={{ flex: 1, fontSize: 30, textAlign: 'center' }}/>
    )
};