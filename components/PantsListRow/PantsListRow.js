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
                    {this.props.name}
                </Text>
                <Text style={styles.colorName}>
                    {this.props.color}
                </Text>
                <Text style={styles.styleName}>
                    {this.props.style}
                </Text>
                <Text style={styles.wearLimit}>
                    {this.props.wear_limit}
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
        backgroundColor: 'white',
        alignSelf: 'stretch',
        borderTopColor: '#EEEEEE',
        borderBottomColor: '#CCCCCC',
        borderTopWidth: 1,
        borderBottomWidth: 1
    },
    pantsThumb: {
        width: 50,
        height: 50
    },
    pantsName: {
        flex: 1,
        fontSize: 20,
        textAlign: 'left'
    },
    colorName: {
        fontSize: 14,
        textAlign: 'left'
    },
    styleName: {
        fontSize: 14,
        textAlign: 'left',
        color: '#333333'
    },
    wearLimit: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'red'
    }
});

module.exports = PantsListRow;
