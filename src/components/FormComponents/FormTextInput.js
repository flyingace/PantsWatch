import React from 'react';
import PropTypes from 'prop-types';
import {
    Text,
    TextInput,
    View
} from 'react-native';
import { OptionallyDisplayed }  from './FormComponents';
import FormStyles from '../../styles/FormStyles';

class FormTextInput extends React.Component {
    constructor() {
        super();
    };

    shouldDisplayError = () => {
        return this.props.showError && this.props.errorText !== '';
    };

    render() {
        return (
            <View style={ FormStyles.formFieldWrapper }>
                <Text style={FormStyles.formLabel }>{ this.props.labelText }</Text>
                <TextInput
                    autoCapitalize='words'
                    autoCorrect={ false }
                    underlineColorAndroid='transparent'
                    style={ FormStyles.textInput }
                    placeholder={ this.props.placeholderText }
                    onChangeText={ (text) => this.props.setFieldValue(text) }
                    value={ this.props.value }
                    onFocus={ this.props.onFocus }
                />
                <OptionallyDisplayed display={ this.shouldDisplayError() }>
                    <View>
                        <Text>{ this.props.errorText }</Text>
                    </View>
                </OptionallyDisplayed>
            </View>
        );
    }
}

FormTextInput.propTypes = {
    fieldName: PropTypes.string,
    labelText: PropTypes.string,
    placeholderText: PropTypes.string,
    setFieldValue: PropTypes.func,
    showError: PropTypes.bool.isRequired,
    value: PropTypes.string
};

FormTextInput.defaultProps = {
    labelText: 'Field Name',
    placeholderText: ''
};


module.exports = FormTextInput;
