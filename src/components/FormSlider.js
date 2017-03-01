/*globals */

import React from 'react';
import {
    PropTypes,
    StyleSheet,
    Text,
    Slider,
    View
} from 'react-native';
import FormStyles from '../styles/FormStyles';

const FormSlider = React.createClass({

    displayName: 'FormSlider',

    propTypes: {
        onValueChange: React.PropTypes.func,
        value: React.PropTypes.number,
        inputRef: React.PropTypes.string,
        labelText: React.PropTypes.string,
        placeholderText: React.PropTypes.string
    },

    getDefaultProps() {
        return {
            value: 6,
            inputRef: '',
            labelText: 'Field Name',
            placeholderText: '',
            onValueChange: this.onValueChange
        };
    },

    getInitialState() {
        return {
            value: this.props.value
        }
    },

    onValueChange(newValue) {
        this.setState({'value':newValue});
    },

    render() {
        return (
            <View style={FormStyles.formFieldWrapper}>
                <View style={FormStyles.majorMinor}>
                    <Text style={FormStyles.formLabel}>{this.props.labelText}</Text>
                    <Slider
                        style={FormStyles.slider}
                        step={1}
                        minimumValue={1}
                        maximumValue={10}
                        required={true}
                        value={this.state.value}
                        onValueChange={this.onValueChange}
                    />
                    <Text style={FormStyles.maxCount}>{this.state.value}</Text>
                </View>
            </View>
        );
    }
});


module.exports = FormSlider;
