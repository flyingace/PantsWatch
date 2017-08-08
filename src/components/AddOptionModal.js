import React from 'react';
import {
    Button,
    Text,
    TextInput
} from 'react-native';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';

class AddOptionModal extends React.Component {

    state = {
            modalVisible: false,
            textFieldValue: ''
    };

    onTextChanged(value) {
        this.setState({ 'textFieldValue': value });
    }

    getDBName(optionType) {
        let DBName;

        switch (optionType) {
            case 'pantsColor':
                DBName = 'colors';
                break;
            case 'pantsBrand':
                DBName = 'brands';
                break;
            case 'pantsStyle':
                DBName = 'styles';
                break;
            default:
                DBName = '';
                break;
        }

        return DBName;
    }

    onOkay() {
        const dbName = this.getDBName(this.props.optionType);
        this.props.addOption(dbName, this.state.textFieldValue);
        this.onTextChanged('');
        this.props.toggleModalVisibility(false);
    }

    onCancel() {
        this.onTextChanged('');
        this.props.toggleModalVisibility(false);
    }

    render() {
        return (
            <Modal isVisible={this.props.modalIsVisible} >
                {this.props.children}
                <Button onPress={this.onCancel} title='Cancel'/>
                <Button onPress={this.onOkay} title='Okay'/>
            </Modal>
        );
    }
}

AddOptionModal.propTypes = {
    modalIsVisible: PropTypes.bool,
    onSubmitEntry: PropTypes.func,
    formFieldLabel: PropTypes.string
};

AddOptionModal.defaultProps = {
    modalIsVisible: false
};

module.exports = AddOptionModal;