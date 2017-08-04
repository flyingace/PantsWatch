import React from 'react';
import PropTypes from 'prop-types';
import {
    Image,
    Text,
    Picker,
    View
} from 'react-native';
import OptionallyDisplayed from './OptionallyDisplayed.js';
import { differenceWith, forIn, isEqual, values } from 'lodash';
import FormStyles from '../styles/FormStyles';
import DownArrow from '../../assets/down_arrow.png';

class FormTextInput extends React.Component {

    getDefaultProps() {
        return {
            labelText: 'Field Name',
            placeholderText: '',
            isEditable: false
        };
    }

    componentWillReceiveProps(nextProps) {
        const currentOptions = this.props.menuOptions;
        const nextOptions = nextProps.menuOptions;

        if (nextOptions.totalrows > currentOptions.totalrows) {
            const newValue = differenceWith(values(nextOptions.rows), values(currentOptions.rows), isEqual)[0].value;
            this.onValueChange(newValue);
        }
    }

    addPickers() {
        let pickers = [<Picker.Item label={ this.props.promptText } key="prompt" value=""/>];

        forIn(this.props.menuOptions.rows, function (option, key) {
            pickers.push(<Picker.Item label={ option.value } key={ key } value={ option.value }/>);
        });

        if (this.props.isEditable) {
            pickers.push(<Picker.Item label="+ Add to this list" key="add" value="add"/>);
        }

        return pickers;
    }

    onValueChange(value) {
        if (value !== 'add') {
            this.props.setFieldValue(value);
        } else {
            this.props.onAddOption(this.props.fieldName);
        }
    }

    shouldDisplayError() {
        return this.props.showError && this.props.errorText !== '';
    }

    render() {
        return (
            <View style={ FormStyles.formFieldWrapper }>
                <Text style={ FormStyles.formLabel }>{ this.props.labelText }</Text>
                <View>
                    <Image source={ DownArrow } style={ FormStyles.fieldIcon } resizeMode={ 'contain' }/>
                    <Picker
                        onValueChange={ this.onValueChange }
                        selectedValue={ this.props.selectedValue }
                        style={ FormStyles.pickerField }>
                        { this.addPickers() }
                    </Picker>
                </View>
                <OptionallyDisplayed display={ this.shouldDisplayError() }>
                    <View>
                        <Text>{ this.props.errorText }</Text>
                    </View>
                </OptionallyDisplayed>
            </View>
        );
    }
}

FormTextInput.propTypes = {
    fieldName: PropTypes.string,
    errorText: PropTypes.string,
    isEditable: PropTypes.bool,
    labelText: PropTypes.string,
    menuOptions: PropTypes.object,
    onAddOption: PropTypes.func,
    promptText: PropTypes.string,
    selectedValue: PropTypes.string,
    setFieldValue: PropTypes.func,
    showError: PropTypes.bool.isRequired
};

module.exports = FormTextInput;
