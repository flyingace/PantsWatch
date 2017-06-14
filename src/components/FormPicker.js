import React from 'react';
import {
    Image,
    Text,
    Picker,
    View
} from 'react-native';
import OptionallyDisplayed from './OptionallyDisplayed.js';
import { forIn } from 'lodash';
import FormStyles from '../styles/FormStyles';
import DownArrow from '../../assets/down_arrow.png';

const FormTextInput = React.createClass({

    displayName: 'FormPicker',

    propTypes: {
        fieldName: React.PropTypes.string,
        errorText: React.PropTypes.string,
        isEditable: React.PropTypes.bool,
        labelText: React.PropTypes.string,
        menuOptions: React.PropTypes.object,
        onAddOption: React.PropTypes.func,
        onFieldChanged: React.PropTypes.func.isRequired,
        promptText: React.PropTypes.string,
        selectedValue: React.PropTypes.string,
        setFieldValue: React.PropTypes.func,
        showError: React.PropTypes.bool.isRequired
    },

    getDefaultProps() {
        return {
            labelText: 'Field Name',
            placeholderText: '',
            isEditable: false
        };
    },

    addPickers() {
        let pickers = [<Picker.Item label={ this.props.promptText } key="prompt" value=""/>];

        forIn(this.props.menuOptions.rows, function (option, key) {
            pickers.push(<Picker.Item label={ option.value } key={ key } value={ option.value }/>);
        });

        if (this.props.isEditable) {
            pickers.push(<Picker.Item label="+ Add to this list" key="add" value="add"/>);
        }

        return pickers;
    },

    onValueChange (value, index) {
        if (value !== 'add') {
            this.props.setFieldValue(value);
            this.props.onFieldChanged(value);
        } else {
            this.props.onAddOption(this.props.fieldName);
        }
    },

    shouldDisplayError() {
        return this.props.showError && this.props.errorText !== '';
    },

    render() {
        return (
            <View style={ FormStyles.formFieldWrapper }>
                <Text style={ FormStyles.formLabel }>{this.props.labelText}</Text>
                <View>
                    <Image source={ DownArrow } style={ FormStyles.fieldIcon } resizeMode={ 'contain' }/>
                    <Picker
                        onValueChange={ this.onValueChange }
                        selectedValue={ this.props.selectedValue }
                        style={ FormStyles.pickerField }>
                        {this.addPickers()}
                    </Picker>
                </View>
                <OptionallyDisplayed display={this.shouldDisplayError()}>
                    <View>
                        <Text>{this.props.errorText}</Text>
                    </View>
                </OptionallyDisplayed>
            </View>
        );
    }
});

module.exports = FormTextInput;
