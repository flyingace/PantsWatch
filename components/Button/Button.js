/*globals */

const React = require('react-native');

const {
    Platform,
    StyleSheet,
    Text,
    TouchableHighlight,
    TouchableNativeFeedback
    } = React;

let TouchableElement = TouchableHighlight;

if (Platform.OS === 'android') {
    TouchableElement = TouchableNativeFeedback;
}

var Button = React.createClass({

    displayName: 'Button',

    propTypes: {
        onButtonPress: React.PropTypes.any,
        buttonText: React.PropTypes.string
    },

    getDefaultProps: function () {
        return {
            onButtonPress: this.handleButtonPress,
            buttonText: 'Click me'
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