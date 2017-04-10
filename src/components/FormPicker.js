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
        inputRef: React.PropTypes.string,
        fieldName: React.PropTypes.string,
        labelText: React.PropTypes.string,
        onValueChange: React.PropTypes.func,
        placeholderText: React.PropTypes.string,
        prompt: React.PropTypes.string,
        selectedValue: React.PropTypes.string
    },

    getDefaultProps() {
        return {
            inputRef: '',
            labelText: 'Field Name',
            onValueChange: this.onValueChange,
            placeholderText: '',
            selectedValue: '01'
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
            this.setState({ [this.props.fieldName]: value });
            console.log(this.state);
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
                        selectedValue={this.props.value}
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
