import React from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import {BADGE_COLORS, HTML_COLORS } from '../../constants';

import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from '../../config.json';
const Icon = createIconSetFromFontello(fontelloConfig);

class DetailAttribute extends React.Component {
    constructor() {
        super();
    };

    static propTypes = {};

    static defaultProps = {};

    state = {};

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    setBadgeColor = (count, limit) => {
        const indx = Math.ceil((count / limit) * 10);

        return (indx <= 10) ? BADGE_COLORS[indx] : BADGE_COLORS[11];
    };

    optionallyRenderColorCircle = (label, value, wearLimit, hexValue) => {
        let circleColor;

        switch (label) {
        case 'Color':
            circleColor = hexValue;
            break;
        case 'Wear Count':
            circleColor = this.setBadgeColor(value, wearLimit);
            break;
        case 'Wear Limit':
            circleColor = this.setBadgeColor(value, value);
            break;
        default:
            circleColor = 'rgba(255,255,255,0)';
        }

        return (
            <Icon name={'circle'} color={circleColor} style={{ flex: 1, fontSize: 30, textAlign: 'center' }}/>
        )
    };

    render() {
        return (
            <View style={detailAttributeStyles.rowStyle}>
                <Icon name={this.props.icon} size={20} style={detailAttributeStyles.iconStyle}/>
                <Text style={detailAttributeStyles.labelStyle}>{this.props.label}:</Text>
                <Text style={detailAttributeStyles.valueStyle}>{this.props.value}</Text>
                {this.optionallyRenderColorCircle(this.props.label, this.props.value, this.props.limit, this.props.pantsColorHex)}
            </View>
        );
    }
}

module.exports = DetailAttribute;

const detailAttributeStyles = StyleSheet.create({
    rowStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: 50,
        marginBottom: 2,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: 'white'
    },
    iconStyle: { flex: 0, marginRight: 5, color: 'grey' },
    labelStyle: { flex: 0, width: 150, fontSize: 20, textAlign: 'left', color: HTML_COLORS.gray, marginRight: 30 },
    valueStyle: { flex: 2, fontSize: 20, textAlign: 'left', color: 'black' },

});