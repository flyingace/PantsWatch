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
        inputRef: React.PropTypes.string,
        labelText: React.PropTypes.string,
        menuOptions: React.PropTypes.array,
        onSubmit: React.PropTypes.any,
        placeholderText: React.PropTypes.string
    },

    getDefaultProps: function () {
        return {
            onSubmit: this.handleSubmitEditing
        };
    },

    handleSubmitEditing: function () {

    },

    render: function () {
        return (
            <View style={styles.formFieldWrapper}>
                <Text style={styles.formLabel}>{this.props.labelText}</Text>
                <TextInput style={styles.textInput} placeholder={this.props.placeholderText}
                           onSubmitEditing={this.props.onSubmit} ref={this.props.inputRef}/>
            </View>
        );
    }
});

var styles = StyleSheet.create({
    formFieldWrapper: {
        backgroundColor: 'rgba(255,255,255,.5)',
        borderRadius: 3,
        flexDirection: 'row',
        padding: 4
    },
    formLabel: {
        fontFamily: 'HappyFox-Condensed',
        fontSize: 30,
        marginRight: 4,
        marginLeft: 4
    },
    textInput: {
        fontFamily: 'HappyFox-Condensed',
        fontSize: 30,
        backgroundColor: 'rgba(255,255,255,.3)',
        borderRadius: 3,
        padding: 4,
        flex: 1
    }
});

module.exports = FormTextInput;
