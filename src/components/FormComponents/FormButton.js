/*globals */

import React from 'react';
import PropTypes from 'prop-types';
import {
    Platform,
    StyleSheet,
    Text,
    TouchableHighlight,
    TouchableNativeFeedback
} from 'react-native';

const TouchableElement = (Platform.OS === 'android') ? TouchableNativeFeedback : TouchableHighlight;

class Button extends React.Component {

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    handleButtonPress() {
        console.log('button pressed');
    }

    render() {
        return (
            <TouchableElement
                style={ styles.button }
                onPress={ this.props.onButtonPress }>
                <Text style={ styles.buttonText }>{ this.props.buttonText }</Text>
            </TouchableElement>
        );
    }
}

Button.propTypes = {
    buttonText: PropTypes.string,
    onButtonPress: PropTypes.any
};

Button.defaultProps = {
    buttonText: 'Click me',
    onButtonPress: this.handleButtonPress
};




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