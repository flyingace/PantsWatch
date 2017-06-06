import React from 'react';
import {
    Button,
    Modal,
    StyleSheet,
    Text,
    TextInput
} from 'react-native';

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

    onTextChange(value) {
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
        this.onTextChange('');
        this.props.toggleModalVisibility(false);
    },

    onCancel() {
        this.onTextChange('');
        this.props.toggleModalVisibility(false);
    },

    render() {
        return (
            <Modal
                animationType={ 'slide' }
                transparent={ false }
                visible={ this.props.modalIsVisible }
                onRequestClose={ () => {
                    this.props.toggleModalVisibility(false);
                } }>
                <Text>Add an option</Text>
                <TextInput ref='newOptionValue' value={ this.state.textFieldValue } onChangeText={ this.onTextChange }/>
                <Button onPress={ this.onCancel } title='Cancel'/>
                <Button onPress={ this.onOkay } title='Okay'/>
            </Modal>
        );
    }
});

const styles = StyleSheet.create(
    {
        wrapper: {
            marginBottom: 8
        },
        label: {
            fontFamily: 'HappyFox-Condensed',
            fontSize: 18,
            textAlign: 'center',
            alignSelf: 'center'
        },
        title: {}
    }
);

module.exports = AddOptionModal;