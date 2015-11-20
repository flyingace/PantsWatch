/*globals */

'use strict';

var React = require('react-native');
const {
    Image,
    StyleSheet,
    Text,
    View
    } = React;

var PantsListRow = React.createClass({

    propTypes: {
        pantsName: React.PropTypes.string,
        colorName: React.PropTypes.string,
        styleName: React.PropTypes.string,
        wearLimit: React.PropTypes.number
    },

    getDefaultProps() {
        return {
            pantsName: 'Favorite Pants',
            colorName: 'Blue',
            styleName: 'Casual',
            wearLimit: 0
        };
    },

    render: function () {
        return (
            <View style={styles.pantsRow}>
                <Image
                    source={require('../../assets/pants01.png')}
                    style={styles.pantsThumb}/>
                <Text style={styles.pantsName}>
                    {this.props.pantsName}
                </Text>
                <Text style={styles.colorName}>
                    {this.props.colorName}
                </Text>
                <Text style={styles.styleName}>
                    {this.props.styleName}
                </Text>
                <Text style={styles.wearLimit}>
                    {this.props.wearLimit}
                </Text>
            </View>
        );
    }
});

var styles = StyleSheet.create({
    pantsRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'lightblue',
        alignSelf: 'stretch'
    },
    pantsThumb: {
        width: 50,
        height: 50
    },
    pantsName: {
        fontSize: 20,
        textAlign: 'center'
    },
    colorName: {
        fontSize: 14,
        textAlign: 'center'
    },
    styleName: {
        fontSize: 14,
        textAlign: 'center',
        color: '#333333'
    },
    wearLimit: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'red'
    }
});

module.exports = PantsListRow;
