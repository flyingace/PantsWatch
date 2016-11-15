import React from 'react';
import {
    View,
    Text,
    PickerIOS
} from 'react-native';

function select(locals) {

    const stylesheet = locals.stylesheet;
    let formGroupStyle = stylesheet.formGroup.normal;
    let controlLabelStyle = stylesheet.controlLabel.normal;
    let selectStyle = stylesheet.select.normal;
    let helpBlockStyle = stylesheet.helpBlock.normal;
    const errorBlockStyle = stylesheet.errorBlock;

    if (locals.hasError) {
        formGroupStyle = stylesheet.formGroup.error;
        controlLabelStyle = stylesheet.controlLabel.error;
        selectStyle = stylesheet.select.error;
        helpBlockStyle = stylesheet.helpBlock.error;
    }

    const label = locals.label ? <Text style={controlLabelStyle}>{locals.label}</Text> : null;
    const help = locals.help ? <Text style={helpBlockStyle}>{locals.help}</Text> : null;
    const error = locals.hasError && locals.error ? <Text style={errorBlockStyle}>{locals.error}</Text> : null;

    const options = locals.options.map(({value, text}) => <PickerIOS.Item key={value} value={value} label={text}/>);

    return (
        <View style={formGroupStyle}>
            {label}
            <PickerIOS
                ref="input"
                style={selectStyle}
                selectedValue={locals.value}
                onValueChange={locals.onChange}
            >
                {options}
            </PickerIOS>
            {help}
            {error}
        </View>
    );
}

module.exports = select;