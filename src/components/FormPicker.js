/*globals */

import React from 'react';
import {
    Image,
    PropTypes,
    StyleSheet,
    Text,
    Picker,
    View
} from 'react-native';
import FormStyles from '../styles/FormStyles';
import DownArrow from '../../assets/down_arrow.png';

const FormTextInput = React.createClass({

    displayName: 'FormPicker',

    propTypes: {
        addPantsColor: React.PropTypes.func,
        inputRef: React.PropTypes.string,
        fieldName: React.PropTypes.string,
        labelText: React.PropTypes.string,
        placeholderText: React.PropTypes.string,
        prompt: React.PropTypes.string,
        selectedValue: React.PropTypes.string
    },

    getDefaultProps() {
        return {
            inputRef: '',
            labelText: 'Field Name',
            placeholderText: '',
            selectedValue: 'black'
        };
    },

    onValueChange (value, index) {
        if (value !== 'add') {
            this.props.addPantsColor(value);
        } else {
            console.log('open dialog to edit color options');
        }
    },

    onEndEditing() {
        console.log('text changed');
    },

    render() {
        return (
            <View style={FormStyles.formFieldWrapper}>
                <Text style={FormStyles.formLabel}>{this.props.labelText}</Text>
                <View>
                    <Image source={DownArrow} style={FormStyles.fieldIcon} resizeMode={'contain'}/>
                    <Picker
                        onValueChange={this.onValueChange}
                        selectedValue={this.props.selectedValue}
                        style={FormStyles.pickerField}
                    >
                        <Picker.Item label="Blue" value="blue"/>
                        <Picker.Item label="Green" value="green"/>
                        <Picker.Item label="Black" value="black"/>
                        <Picker.Item label="Edit Color List" value="add"/>
                    </Picker>
                </View>
            </View>
        );
    }
});

module.exports = FormTextInput;
