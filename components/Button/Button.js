/*globals */

const React = require('react-native');

const {
    Platform,
    StyleSheet,
    Text,
    TouchableHighlight,
    TouchableNativeFeedback
    } = React;

const TouchableElement = (Platform.OS === 'android') ? TouchableNativeFeedback : TouchableHighlight;

const Button = React.createClass({

    displayName: 'Button',

    propTypes: {
        buttonText: React.PropTypes.string,
        onButtonPress: React.PropTypes.any
    },

    getDefaultProps: function () {
        return {
            buttonText: 'Click me',
            onButtonPress: this.handleButtonPress
        };
    },

    getInitialState: function () {
        return null;
    },

    componentDidMount: function () {
    },

    componentWillUnmount: function () {
    },

    handleButtonPress: function () {
        console.log('button pressed');
    },

    render: function () {
        return (
            <TouchableElement
                style={styles.button}
                onPress={this.props.onButtonPress}>
                <Text style={styles.buttonText}>{this.props.buttonText}</Text>
            </TouchableElement>
        );
    }
});

const styles = StyleSheet.create({
    button: {
        height: 30
    },
    buttonText: {}
});

module.exports = Button;