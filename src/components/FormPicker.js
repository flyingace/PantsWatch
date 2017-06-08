import React from 'react';
import {
    Image,
    PropTypes,
    StyleSheet,
    Text,
    Picker,
    View
} from 'react-native';
import { forIn } from 'lodash';
import FormStyles from '../styles/FormStyles';
import DownArrow from '../../assets/down_arrow.png';

const FormTextInput = React.createClass({

    displayName: 'FormPicker',

    propTypes: {
        fieldName: React.PropTypes.string,
        inputRef: React.PropTypes.string,
        isEditable: React.PropTypes.bool,
        labelText: React.PropTypes.string,
        menuOptions: React.PropTypes.object,
        onAddOption: React.PropTypes.func,
        selectedValue: React.PropTypes.string,
        setFieldValue: React.PropTypes.func
    },

    getDefaultProps() {
        return {
            inputRef: '',
            labelText: 'Field Name',
            placeholderText: '',
            isEditable: false
        };
    },

    addPickers() {
        let pickers = [];

        forIn(this.props.menuOptions.rows, function (option, key) {
            pickers.push(<Picker.Item label={ option.value } key={ key } value={ option.value }/>);
        });

        if (this.props.isEditable) {
            pickers.push(<Picker.Item label="Add to this list" key="add" value="add"/>);
        }

        return pickers;
    },

    onValueChange (value, index) {
        if (value !== 'add') {
            this.props.setFieldValue(value);
        } else {
            this.props.onAddOption(this.props.fieldName);
            console.log('open dialog to edit color options');
        }
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
            </View>
        );
    }
});

module.exports = FormTextInput;
