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
import { map } from 'lodash';
import FormStyles from '../styles/FormStyles';
import DownArrow from '../../assets/down_arrow.png';

const FormTextInput = React.createClass({

    displayName: 'FormPicker',

    propTypes: {
        addPantsAttribute: React.PropTypes.func,
        inputRef: React.PropTypes.string,
        fieldName: React.PropTypes.string,
        labelText: React.PropTypes.string,
        menuOptions: React.PropTypes.array,
        selectedValue: React.PropTypes.string
    },

    getDefaultProps() {
        return {
            inputRef: '',
            labelText: 'Field Name',
            placeholderText: ''
        };
    },

    addPickers() {
        let pickersList;

        const pickers = map(this.props.menuOptions, function (option, index) {
                return ( <Picker.Item label={option.label} key={option.value} value={option.value}/> )
            }
        );

        return (pickers);
    },

    onValueChange (value, index) {
        if (value !== 'add') {
            this.props.addPantsAttribute(value);
        } else {
            console.log('open dialog to edit color options');
        }
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
                        style={FormStyles.pickerField}>
                        {this.addPickers()}
                        {/*<Picker.Item label="Blue" value="blue"/>*/}
                        {/*<Picker.Item label="Green" value="green"/>*/}
                        {/*<Picker.Item label="Black" value="black"/>*/}
                        <Picker.Item label="Add to this list" value="add"/>
                    </Picker>
                </View>
            </View>
        );
    }
});

module.exports = FormTextInput;
