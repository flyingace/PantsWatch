import React from 'react';
import PropTypes from 'prop-types';
import {
    Image,
    Text,
    Picker,
    View
} from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import { differenceWith, forIn, isEqual, values } from 'lodash';
import DownArrow from '../../../assets/down_arrow.png';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from '../../config.json';
import { FormAttribute, OptionallyDisplayed } from "../FormComponents/FormComponents";
const Icon = createIconSetFromFontello(fontelloConfig);

class FormPicker extends React.Component {

    componentWillReceiveProps(nextProps) {
        const currentOptions = this.props.menuOptions;
        const nextOptions = nextProps.menuOptions;

        if (nextOptions.totalrows > currentOptions.totalrows) {
            const newValue = differenceWith(values(nextOptions.rows), values(currentOptions.rows), isEqual)[0].value;
            this.onValueChange(newValue);
        }
    }
     onValueChange(value) {
        if (value !== 'add') {
            //TODO: Fix when React Navigation is fully implemented
            this.props.setFieldValue(value);
        } else {
            this.props.onAddOption(this.props.fieldName);
        }
    }

    shouldDisplayError() {
        return this.props.showError && this.props.errorText !== '';
    }

    render() {
        const data = this.props.menuOptions.rows;
        if (data) data.push({_id: 0, key: `add${this.props.label}`, label: '+ Add to this list', value: 'add'});

        return (
            <View>
                <ModalSelector
                    data={data}
                    initValue="Select something yummy!"
                    onChange={this.onValueChange}>
                    <FormAttribute label={this.props.label} icon={this.props.icon} value={this.props.value}/>
                </ModalSelector>
                <OptionallyDisplayed display={this.shouldDisplayError()}>
                    <View>
                        <Text>{this.props.errorText}</Text>
                    </View>
                </OptionallyDisplayed>
            </View>
        );
    }
}


FormPicker.propTypes = {
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

FormPicker.defaultProps = {
    labelText: 'Field Name',
    placeholderText: '',
    isEditable: false,
    value: 'Choose a color',
    showError: false
};

const rowStyle = {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 50,
    marginBottom: 2,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'white'
};
const iconStyle = { flex: 0, marginRight: 5, color: 'grey' };
const labelStyle = { flex: 0, width: 120, fontSize: 20, textAlign: 'left', color: 'grey', marginRight: 20 };
const valueStyle = { flex: 2, fontSize: 20, textAlign: 'right', color: 'black' };
const pickerStyle = { flex: 2, color: 'black', fontSize: 20};
const downArrowStyle = { flex: 0, marginRight: 5 };


module.exports = FormPicker;
