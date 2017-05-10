import React from 'react';
import {
    Button,
    Modal,
    PropTypes,
    StyleSheet,
    TextInput,
    View
} from 'react-native';

import FormButton from './FormButton';
import FormTextInput from './FormTextInput';


const AddOptionModal = React.createClass({

    displayName: 'AddOptionModal',

    propTypes: {
        // paneStyle: React.PropTypes.object
    },

    getDefaultProps() {
        return {
            onPress: this._onPress,
            paneLabel: 'Pants Pane',
        };
    },

    getInitialState() {
        return {
            modalVisible: true
        }
    },

    setModalVisible(isVisible) {
        this.setState({modalVisible: isVisible})
    },

    onCancel() {
        this.setModalVisible(false);
    },

    onOkay() {
        this.setModalVisible(false);
        console.log('okay');
    },

    render() {
        return (
            <Modal
                animationType={"fade"}
                transparent={false}
                visible={this.state.modalVisible}
                onRequestClose={this.props.onRequestClose}>
                <TextInput value=''/>
                <Button onPress={this.onCancel} title='Cancel'/>
                <Button onPress={this.onOkay} title='Okay'/>
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