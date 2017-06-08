/*globals */

import React from 'react';

import {
    Platform,
    StyleSheet,
    Text,
    TouchableHighlight,
    TouchableNativeFeedback
} from 'react-native';

const TouchableElement = (Platform.OS === 'android') ? TouchableNativeFeedback : TouchableHighlight;

const Button = React.createClass({

    displayName: 'Button',

    propTypes: {
        buttonText: React.PropTypes.string,
        onButtonPress: React.PropTypes.any
    },

    getDefaultProps() {
        return {
            buttonText: 'Click me',
            onButtonPress: this.handleButtonPress
        };
    },

    getInitialState() {
        return null;
    },

    componentDidMount() {
    },

    componentWillUnmount() {
    },

    handleButtonPress() {
        console.log('button pressed');
    },

    render() {
        return (
            <TouchableElement
                style={ styles.button }
                onPress={ this.props.onButtonPress }>
                <Text style={ styles.buttonText }>{this.props.buttonText}</Text>
            </TouchableElement>
        );
    }
});

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#66d8ff',
        borderRadius: 4,
        height: 36,
        justifyContent: 'center',
        marginTop: 10
    },
    buttonText: {
        alignSelf: 'center',
        color: '#FFFFFF',
        fontWeight: 'bold',
        textAlign: 'center'
    }
});

module.exports = Button;