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
        selectedValue: React.PropTypes.string,
        isEditable: React.PropTypes.bool
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
        let pickers = map(this.props.menuOptions, function (option, index) {
                return <Picker.Item label={option.label} key={option.value} value={option.value} />
            }
        );

        if (this.props.isEditable) {
            pickers.push(<Picker.Item label="Add to this list" key="add" value="add"/>);
        }

        return pickers;
    },

    //unused, but keep for now to apply when new items are added to the db
    formatForValue(label) {
        return label.replace(/(\W)/, '').toLowerCase();
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
                    </Picker>
                </View>
            </View>
        );
    }
});

module.exports = FormTextInput;
