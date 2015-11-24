/*globals */

const React = require('react-native');
const {
    StyleSheet,
    Text,
    TextInput,
    View
    } = React;

const FormTextInput = React.createClass({

    displayName: 'FormItem',

    propTypes: {
        labelText: React.PropTypes.string,
        menuOptions: React.PropTypes.array,
        placeholderText: React.PropTypes.string
    },

    getDefaultProps: function () {
        return null;
    },

    render: function () {
        return (
            <View>
                <Text style={styles.formLabel}>{this.props.labelText}</Text>
                <TextInput style={styles.textInput} placeholder={this.props.placeholderText}/>
            </View>
        );
    }
});

var styles = StyleSheet.create({
    formLabel: {
        height: 30,
        backgroundColor: '#CCCCCC',
        alignSelf: 'stretch'
    },
    textInput: {
        backgroundColor: '#DDDDDD',
        height: 30
    },
});

module.exports = FormTextInput;
