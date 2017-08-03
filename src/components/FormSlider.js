import React from 'react';
import PropTypes from 'prop-types';
import {
    Text,
    Slider,
    View
} from 'react-native';
import FormStyles from '../styles/FormStyles';

class FormSlider extends React.Component {

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
}

FormSlider.propTypes = {
    onValueChange: PropTypes.func,
    value: PropTypes.number,
    labelText: PropTypes.string
};

module.exports = FormSlider;
