/*globals */

'use strict';

var React = require('react');
const {
    Image,
    StyleSheet,
    Text,
    View
    } = require('react-native');
const MaxWearsBox = require('./MaxWearsBox');

var PantsListRow = React.createClass({

    propTypes: {
        pantsName: React.PropTypes.string,
        pantsColor: React.PropTypes.string,
        pantsBrand: React.PropTypes.string,
        pantsStyle: React.PropTypes.string,
        maxWears: React.PropTypes.number,
        pantsImgSrc: React.PropTypes.any
    },

    getDefaultProps() {
        return {
            pantsName: 'Favorite Pants',
            pantsColor: 'Blue',
            pantsStyle: 'Casual',
            pantsBrand: 'Levis',
            maxWears: 0,
            pantsImgSrc: require('../assets/pants01.png'),
            lastWornDate: '12/23/15'
        };
    },

    render: function () {
        return (
            <View style={rowStyles.pantsRow}>
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
                    <MaxWearsBox wearsCount={this.props.wearsCount} maxWears={this.props.maxWears}/>
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

var rowStyles = StyleSheet.create({
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
        textAlign: 'left'

    },
    middleColBottom: {
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'space-between'
    },
    color: {
        flex: 1,
        fontSize: 18,
        fontFamily: 'HappyFox-Condensed',
        textAlign: 'left'
    },
    style: {
        flex: 1,
        fontSize: 18,
        fontFamily: 'HappyFox-Condensed',
        textAlign: 'left'
    },
    brand: {
        flex: 1,
        fontSize: 18,
        fontFamily: 'HappyFox-Condensed',
        textAlign: 'left'
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