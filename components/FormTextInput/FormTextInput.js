/*globals */

const React = require('react-native');
const {
    DropDown,
    StyleSheet,
    Text,
    TextInput,
    View
    } = React;

const FormTextInput = React.createClass({

    displayName: 'FormItem',

    propTypes: {
        itemType: React.PropTypes.string,
        labelText: React.PropTypes.string,
        menuOptions: React.PropTypes.array,
        placeholderText: React.PropTypes.string
    },

    getDefaultProps: function () {
        return {
            itemType: 'textInput'
        };
    },

    render: function () {
        return (
            <View style={styles.formItemWrapper}>
                <Text style={styles.formLabel}>{this.props.labelText}</Text>
                <TextInput style={styles.textInput} placeholder={this.props.placeholderText} />
            </View>
        );
    }
});

var styles = StyleSheet.create({
    formItemWrapper: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        alignSelf: 'stretch'
    },
    formLabel: {},
    textInput: {
        backgroundColor: '#FF00FF',
        width: 300,
        height: 50
    },
    dropDownMenu: {}
});

module.exports = FormTextInput;
