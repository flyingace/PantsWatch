/*globals */

import React from 'react';
import {
    PropTypes,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';
import FormStyles from '../styles/FormStyles';

const FormTextInput = React.createClass({

    displayName: 'FormTextInput',

    propTypes: {
        value: React.PropTypes.string,
        inputRef: React.PropTypes.string,
        labelText: React.PropTypes.string,
        placeholderText: React.PropTypes.string
    },

    getDefaultProps() {
        return {
            inputRef: '',
            labelText: 'Field Name',
            placeholderText: ''
        };
    },

    onEndEditing() {
        console.log('text changed');
    },

    handleSubmitEditing() {
        console.log('submitted')
    },

    render() {
        return (
            <View style={FormStyles.formFieldWrapper}>
                <Text style={FormStyles.formLabel}>{this.props.labelText}</Text>
                <TextInput
                    autoCapitalize={'words'}
                    autoCorrect={false}
                    underlineColorAndroid="transparent"
                    style={FormStyles.textInput}
                    placeholder={this.props.placeholderText}
                    onEndEditing={this.onEndEditing}
                    ref={this.props.inputRef}
                    value={this.props.value}
                />
            </View>
        );
    }
});


module.exports = FormTextInput;
