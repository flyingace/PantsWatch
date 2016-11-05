import React from 'react';
import {
    View,
    Text
} from 'react-native';

function struct(locals) {

    const stylesheet = locals.stylesheet;
    const fieldsetStyle = stylesheet.fieldset;
    let controlLabelStyle = stylesheet.controlLabel.normal;

    if (locals.hasError) {
        controlLabelStyle = stylesheet.controlLabel.error;
    }

    const label = locals.label ? <Text style={controlLabelStyle}>{locals.label}</Text> : null;
    const error = locals.hasError && locals.error ? <Text style={stylesheet.errorBlock}>{locals.error}</Text> : null;

    const rows = locals.order.map(function (name) {
        return locals.inputs[name];
    });

    return (
        <View style={fieldsetStyle}>
            {label}
            {error}
            {rows}
        </View>
    );
}

module.exports = struct;