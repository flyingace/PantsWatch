/*globals */

import React from 'react';
import {
    Text,
    TextInput,
    View
} from 'react-native';
import FormStyles from '../styles/FormStyles';

const FormTextInput = React.createClass({

    displayName: 'FormTextInput',

    propTypes: {
        inputRef: React.PropTypes.string,
        fieldName: React.PropTypes.string,
        value: React.PropTypes.string,
        labelText: React.PropTypes.string,
        placeholderText: React.PropTypes.string
    },

    getDefaultProps() {
        return {
            text: '',
            labelText: 'Field Name',
            placeholderText: ''
        };
    },

    componentWillMount() {
        // this.setState({texty: ''})
    },

    onChangeText(text) {
        const dbFieldName = this.props.fieldName;
        console.log(typeof dbFieldName);
        this.setState({[dbFieldName]:text});
        console.log(this.state);
    },

    onEndEditing(data) {
        this.setState({PantsName: data})
    },

    handleSubmitEditing() {
        console.log('submitted');
    },

    render() {
        return (
            <View style={FormStyles.formFieldWrapper}>
                <Text style={FormStyles.formLabel}>{this.props.labelText}</Text>
                <TextInput
                    autoCapitalize='words'
                    autoCorrect={false}
                    underlineColorAndroid='transparent'
                    style={FormStyles.textInput}
                    placeholder={this.props.placeholderText}
                    onChangeText={this.onChangeText}
                    value={this.props.value}
                    ref={this.props.inputRef}
                />
            </View>
        );
    }
});


module.exports = FormTextInput;
