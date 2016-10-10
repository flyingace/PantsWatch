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
        pantName: React.PropTypes.string,
        pantColor: React.PropTypes.string,
        pantStyle: React.PropTypes.string,
        pantBrand: React.PropTypes.string,
        pantWearLimit: React.PropTypes.string,
        pantImgSrc: React.PropTypes.any,
        pantLastWornOn: React.PropTypes.string
    },

    getDefaultProps() {
        return {
            pantName: 'Favorite Pants',
            pantColor: 'Blue',
            pantStyle: 'Casual',
            pantBrand: 'Levis',
            pantWearLimit: '0',
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
                        {this.props.pantName}
                    </Text>
                    <View style={rowStyles.middleColBottom}>
                        <Text style={rowStyles.color}>{this.props.pantColor} • </Text>
                        <Text style={rowStyles.brand}>{this.props.pantBrand} • </Text>
                        <Text style={rowStyles.style}>{this.props.pantStyle}</Text>
                    </View>
                </View>
                <View style={rowStyles.rightCol}>
                    <MaxWearsBox wearsCount={this.props.pantWearsCount} maxWears={this.props.pantWearLimit}/>
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
