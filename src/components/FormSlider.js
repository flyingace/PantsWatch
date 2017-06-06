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
        labelText: React.PropTypes.string
    },

    render() {
        return (
            <View style={ FormStyles.formFieldWrapper }>
                <View style={ FormStyles.majorMinor }>
                    <Text style={ FormStyles.formLabel }>{this.props.labelText}</Text>
                    <Slider
                        style={ FormStyles.slider }
                        step={ 1 }
                        minimumValue={ 1 }
                        maximumValue={ 10 }
                        required={ true }
                        value={ this.props.value }
                        onValueChange={ this.props.onValueChange }
                    />
                    <Text style={ FormStyles.maxCount }>{this.props.value}</Text>
                </View>
            </View>
        );
    }
});


module.exports = FormSlider;
