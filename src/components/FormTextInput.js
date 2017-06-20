import React from 'react';
import {
    Text,
    TextInput,
    View
} from 'react-native';
import OptionallyDisplayed from './OptionallyDisplayed.js';
import FormStyles from '../styles/FormStyles';

const FormTextInput = React.createClass({

    displayName: 'FormTextInput',

    propTypes: {
        fieldName: React.PropTypes.string,
        labelText: React.PropTypes.string,
        onFieldChanged: React.PropTypes.func.isRequired,
        placeholderText: React.PropTypes.string,
        setFieldValue: React.PropTypes.func,
        showError: React.PropTypes.bool.isRequired,
        value: React.PropTypes.string
    },

    getDefaultProps() {
        return {
            labelText: 'Field Name',
            placeholderText: ''
        };
    },

    componentWillReceiveProps(nextProps) {
        if (nextProps.showError && nextProps.errorText !== '') {
            this.props.onFieldChanged(nextProps.value);
        }
    },

    onTextChanged(text) {
        this.props.onFieldChanged(text);
        this.props.setFieldValue(text);
    },

    shouldDisplayError() {
        return this.props.showError && this.props.errorText !== '';
    },

    render() {
        return (
            <View style={ FormStyles.formFieldWrapper }>
                <Text style={ FormStyles.formLabel }>{this.props.labelText}</Text>
                <TextInput
                    autoCapitalize='words'
                    autoCorrect={ false }
                    underlineColorAndroid='transparent'
                    style={ FormStyles.textInput }
                    placeholder={ this.props.placeholderText }
                    onChangeText={ this.onTextChanged }
                    value={ this.props.value }
                />
                <OptionallyDisplayed display={ this.shouldDisplayError() }>
                    <View>
                        <Text>{this.props.errorText}</Text>
                    </View>
                </OptionallyDisplayed>
            </View>
        );
    }
});


module.exports = FormTextInput;
