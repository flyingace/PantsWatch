const React = require('react');
const { Image, PropTypes, StyleSheet, Text, TouchableOpacity, View } = require('react-native');
const Dimensions = require('Dimensions');

const windowDims = Dimensions.get('window');

const Pane = React.createClass({

    displayName: 'Pane',

    propTypes: {
        // paneStyle: React.PropTypes.object
    },

    getDefaultProps: function () {
        return {
            onPress: this._onPress,
            paneLabel: 'Pants Pane',
            imageURL: require('../assets/PantsThumb.png')        };
    },

    getInitialState: function () {
        return null;
    },

    componentDidMount: function () {
    },

    componentWillUnmount: function () {
    },

    _onPress: function () {
        console.log('pane pressed')
    },

    render: function () {
        return (
                <TouchableOpacity onPress={this.props.onPress} style={styles.wrapper}>
                    <Image source={this.props.imageURL} resizeMode={Image.resizeMode.cover} style={this.props.paneStyle} />
                    <Text style={styles.label}>{this.props.paneLabel}</Text>
                </TouchableOpacity>
        );
    }
});

var styles = StyleSheet.create(
    {
        wrapper: {
            marginBottom: 8
        },
        label: {
            fontFamily: 'HappyFox-Condensed',
            fontSize: 18,
            textAlign: 'center',
            alignSelf: 'center'
        },
        title: {

        }
    }
);

module.exports = Pane;