/*globals */

'use strict';

var React = require('react-native');
const {
    Image,
    StyleSheet,
    Text,
    View
    } = React;
const MaxWearsBox = require('./MaxWearsBox');

var PantsListRow = React.createClass({

    propTypes: {
        pantsName: React.PropTypes.string,
        pantsColor: React.PropTypes.string,
        pantsStyle: React.PropTypes.string,
        pantsBrand: React.PropTypes.string,
        pantsWearLimit: React.PropTypes.string,
        pantImgSrc: React.PropTypes.any,
        pantLastWornOn: React.PropTypes.string
    },

    getDefaultProps() {
        return {
            pantsName: 'Favorite Pants',
            pantsColor: 'Blue',
            pantsStyle: 'Casual',
            pantsBrand: 'Levis',
            pantsWearLimit: '0',
            pantImgSrc: require('../assets/pants01.png'),
            pantLastWornOn: '12/23/15'
        };
    },

    render: function () {
        return (
            <View style={rowStyles.pantsRow}>
                <Image
                    source={this.props.pantImgSrc}
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
                    <MaxWearsBox wearsCount={this.props.pantWearsCount} maxWears={this.props.pantsWearLimit}/>
                    <View style={rowStyles.rightColBottom}>
                        <Text style={rowStyles.lastWornOn}>
                            Last Worn On:
                        </Text>
                        <Text style={rowStyles.lastWornOn}>
                            {this.props.pantLastWornOn}
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
