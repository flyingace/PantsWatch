import React from 'react';
import PropTypes from 'prop-types';
import {
    Image,
    Text,
    View
} from 'react-native';
import { BADGE_COLORS } from "../../constants";

import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from '../../config.json';
const Icon = createIconSetFromFontello(fontelloConfig);

export const DetailTile = (props) => {
    const imageStyle = {flex: 1, flexDirection: 'row', alignItems: 'flex-end', height: 280, backgroundColor: '#CCC', overflow:'visible'};
    const titleStyle = {flex: 1, fontSize: 45, textAlign: 'left', color: 'black', backgroundColor: 'rgba(255,255,255,.4)', paddingLeft: 10};

    return (
        <View>
            <Image source={require('../../../assets/PantsPlaceholder.png')} resizeMode={'contain'} style={imageStyle}/>
            <Text style={titleStyle}>{props.name}</Text>
        </View>
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
    const rowStyle = {flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', height: 50, marginBottom: 2, paddingLeft: 10, paddingRight: 10, backgroundColor: 'white'};
    const iconStyle = {flex: 0, marginRight: 5, color: 'grey'};
    const labelStyle = { flex: 0, width: 120, fontSize: 20, textAlign: 'left', color: 'slategrey', marginRight: 30 };
    const valueStyle = { flex: 2, fontSize: 20, textAlign: 'left', color: 'black' };

    return (
        <View style={rowStyle}>
            <Icon name={props.icon} size={20} style={iconStyle} />
            <Text style={labelStyle}>{props.label}:</Text>
            <Text style={valueStyle}>{props.value}</Text>
            {optionallyRenderColorCircle(props.label, props.value, props.limit, props.pantsColorHex)}
        </View>
    )
};

const setBadgeColor = (count, limit) => {
    const indx = Math.ceil((count/limit) * 10);

    return (indx <= 10) ? BADGE_COLORS[indx] : BADGE_COLORS[11];
};

const optionallyRenderColorCircle = (label, value, wearLimit, hexValue) => {
    let circleColor;

    switch (label) {
    case 'Color':
        circleColor = hexValue;
        break;
    case 'Wear Count':
        circleColor = setBadgeColor(value, wearLimit);
        break;
    case 'Wear Limit':
        circleColor = setBadgeColor(value, value);
        break;
    default:
        circleColor = 'rgba(255,255,255,0)';
    }

    return (
        <Icon name={'circle'} color={circleColor} style={{ flex: 0,  padding: 0, marginRight: 10, marginLeft: 10, fontSize: 30, textAlign: 'center' }}/>
    )
};