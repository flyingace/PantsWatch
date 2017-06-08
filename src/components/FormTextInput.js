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
        setFieldValue: React.PropTypes.func,
        inputRef: React.PropTypes.string,
        fieldName: React.PropTypes.string,
        value: React.PropTypes.string,
        labelText: React.PropTypes.string,
        placeholderText: React.PropTypes.string
    },

    getDefaultProps() {
        return {
            labelText: 'Field Name',
            placeholderText: ''
        };
    },

    componentWillMount() {
        // this.setState({texty: ''})
    },

    onChangeText(text) {
        this.props.setFieldValue(text);
    },

    handleSubmitEditing() {
        console.log('submitted');
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
                    onChangeText={ this.onChangeText }
                    value={ this.props.value }
                    ref={ this.props.inputRef }
                />
            </View>
        );
    }
});


module.exports = FormTextInput;
