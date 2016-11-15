/*globals */

import React from 'react';
import {
    PropTypes,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';

const FormTextInput = React.createClass({

    displayName: 'FormItem',

    propTypes: {
        inputRef: React.PropTypes.string,
        labelText: React.PropTypes.string,
        menuOptions: React.PropTypes.array,
        onChangeTxt: React.PropTypes.any,
        placeholderText: React.PropTypes.string
    },

    getDefaultProps() {
        return {
            onSubmit: this.handleSubmitEditing
        };
    },

    handleSubmitEditing() {
        console.log('submitted')
    },

    render() {
        return (
            <View style={styles.formFieldWrapper}>
                <Text style={styles.formLabel}>{this.props.labelText}</Text>
                <TextInput
                    autoCapitalize={'words'}
                    autoCorrect={false}
                    underlineColorAndroid="transparent"
                    style={styles.textInput}
                    placeholder={this.props.placeholderText}
                    onChangeText={this.props.onChangeTxt}
                    ref={this.props.inputRef}
                    value={this.props.value}
                />
            </View>
        );
    }
});

const styles = StyleSheet.create({
    formFieldWrapper: {
        backgroundColor: 'rgba(255,255,255,.5)',
        borderRadius: 3,
        flexDirection: 'row',
        padding: 4,
        marginBottom: 10
    },
    formLabel: {
        fontFamily: 'HappyFox-Condensed',
        fontSize: 30,
        marginRight: 4,
        marginLeft: 4
    },
    textInput: {
        fontFamily: 'HappyFox-Condensed',
        fontSize: 30,
        backgroundColor: 'rgba(255,255,255,.3)',
        borderRadius: 3,
        borderWidth: 0,
        padding: 4,
        flex: 1
    }
});

module.exports = FormTextInput;
