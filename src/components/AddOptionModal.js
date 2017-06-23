import React from 'react';
import {
    Button,
    Text,
    TextInput
} from 'react-native';
import Modal from 'react-native-modal';

const AddOptionModal = React.createClass({

    displayName: 'AddOptionModal',

    propTypes: {
        modalIsVisible: React.PropTypes.bool,
        onSubmitEntry: React.PropTypes.func,
        formFieldLabel: React.PropTypes.string
    },

    getDefaultProps() {
        return {
            modalIsVisible: false
        };
    },

    getInitialState() {
        return {
            modalVisible: false,
            textFieldValue: ''
        };
    },

    onTextChanged(value) {
        this.setState({ 'textFieldValue': value });
    },

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
    },

    onOkay() {
        const dbName = this.getDBName(this.props.optionType);
        this.props.addOption(dbName, this.state.textFieldValue);
        this.onTextChanged('');
        this.props.toggleModalVisibility(false);
    },

    onCancel() {
        this.onTextChanged('');
        this.props.toggleModalVisibility(false);
    },

    render() {
        return (
            <Modal
                animationType={ 'slide' }
                transparent={ false }
                isVisible={ this.props.modalIsVisible }
                onRequestClose={ () => {
                    this.props.toggleModalVisibility(false);
                } }>
                <Text>Add an option</Text>
                <TextInput ref='newOptionValue' value={ this.state.textFieldValue } onChangeText={ this.onTextChanged }/>
                <Button onPress={ this.onCancel } title='Cancel'/>
                <Button onPress={ this.onOkay } title='Okay'/>
            </Modal>
        );
    }
});

module.exports = AddOptionModal;