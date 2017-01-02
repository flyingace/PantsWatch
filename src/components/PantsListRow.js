/*globals */

'use strict';

import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View
} from 'react-native';
import WearLimitBox from './WearLimitBox';
import defaultPantsImgSrc from '../../assets/pants01.png'

const PantsListRow = React.createClass({

    propTypes: {
        pantsName: React.PropTypes.string,
        pantsColor: React.PropTypes.string,
        pantsBrand: React.PropTypes.string,
        pantsStyle: React.PropTypes.string,
        pantsWearLimit: React.PropTypes.number,
        pantsImgSrc: React.PropTypes.any,
        selected: React.PropTypes.bool
    },

    getDefaultProps() {
        return {
            pantsName: 'Favorite Pants',
            pantsColor: 'Blue',
            pantsBrand: 'Levis',
            pantsStyle: 'Casual',
            pantsWearLimit: 9,
            pantsImgSrc: {defaultPantsImgSrc},
            selected: false,
            lastWornDate: '12/23/15'
        };
    },

    render() {
        const rowStyle = (this.props.selected) ? rowStyles.selectedRow : rowStyles.pantsRow;
        return (
            <View style={rowStyle}>
                <Image
                    source={this.props.pantsImgSrc}
                    style={rowStyles.thumb}/>
                <View style={rowStyles.middleCol}>
                    <Text style={rowStyles.name}>
                        {this.props.pantsName}
                    </Text>
                    <View style={rowStyles.middleColBottom}>
                        <Text style={rowStyles.color}>{this.props.pantsColor} • </Text>
                        <Text style={rowStyles.brand}>{this.props.pantsBrand} • </Text>
                        <Text style={rowStyles.style}>{this.props.pantsStyle}</Text>
                    </View>
                </View>
                <View style={rowStyles.rightCol}>
                    <WearLimitBox pantsWearCount={this.props.pantsWearCount} pantsWearLimit={this.props.pantsWearLimit}/>
                    <View style={rowStyles.rightColBottom}>
                        <Text style={rowStyles.lastWornOn}>
                            Last Worn On:
                        </Text>
                        <Text style={rowStyles.lastWornOn}>
                            {this.props.lastWornDate}
                        </Text>
                    </View>
                </View>
            </View>
        );
    }
});

const rowStyles = StyleSheet.create({
    pantsRow: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'rgba(255,255,255,.6)',
        borderTopColor: '#EEEEEE',
        borderTopWidth: 1,
        height: 76,
        padding: 3,
        overflow: 'hidden'
    },
    selectedRow: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'rgba(255,255,255,.85)',
        borderTopColor: '#EEEEEE',
        borderTopWidth: 1,
        height: 76,
        padding: 3,
        overflow: 'hidden',
    },
    thumb: {
        width: 70,
        height: 70,
        alignSelf: 'flex-start'
    },
    middleCol: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginHorizontal: 8
    },
    name: {
        fontSize: 40,
        fontFamily: 'HappyFox-Condensed',
        textAlign: 'left',
        color: 'black'

    },
    middleColBottom: {
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'space-between'
    },
    color: {
        flex: 1,
        fontSize: 24,
        fontFamily: 'HappyFox-Condensed',
        textAlign: 'left',
        color: 'black'
    },
    style: {
        flex: 1,
        fontSize: 24,
        fontFamily: 'HappyFox-Condensed',
        textAlign: 'left',
        color: 'black'
    },
    brand: {
        flex: 1,
        fontSize: 24,
        fontFamily: 'HappyFox-Condensed',
        textAlign: 'left',
        color: 'black'
    },
    rightCol: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    rightColBottom: {
        alignItems: 'center'
    },
    lastWornOn: {
        fontFamily: 'HappyFox-Condensed',
        fontSize: 14,
        lineHeight: 14,
        textAlign: 'center'
    }
});

module.exports = PantsListRow;
