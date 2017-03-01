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
        onValueChange: React.PropTypes.func,
        prompt: React.PropTypes.string,
        selectedValue: React.PropTypes.string,
        inputRef: React.PropTypes.string,
        labelText: React.PropTypes.string,
        placeholderText: React.PropTypes.string
    },

    getDefaultProps() {
        return {
            onValueChange: this.onValueChange,
            selectedValue: '01',
            inputRef: '',
            labelText: 'Field Name',
            placeholderText: ''
        };
    },

    //TODO: The action here whereby the picker updates the state needs to be changed to use redux
    getInitialState() {
        return {
            selectedValue: '01'
        }
    },

    onValueChange (value, index) {
        if (value !== 'add') {
            const newState = { 'selectedValue': value };
            this.setState(newState);
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
                <Image source={DownArrow} style={FormStyles.fieldIcon} resizeMode={'contain'} />
                <Picker
                    onValueChange={this.onValueChange}
                    selectedValue={this.state.selectedValue}
                    style={FormStyles.pickerField}
                >

                    <Picker.Item label="Blue" value="01"/>
                    <Picker.Item label="Green" value="02"/>
                    <Picker.Item label="Black" value="03"/>
                    <Picker.Item label="Edit Color List" value="add"/>
                </Picker>
                </View>
            </View>
        );
    }
});

module.exports = FormTextInput;
