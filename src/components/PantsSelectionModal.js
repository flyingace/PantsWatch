/*globals */

'use strict';

import React from 'react';
import {
    Button,
    Modal,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from 'react-native';

const PantsSelectionModal = React.createClass({

    propTypes: {
        isOpen: React.PropTypes.bool,
        onRequestClose: React.PropTypes.func
    },

    getDefaultProps() {
        return {
            isOpen: false
        }
    },

    setPantsAsWorn() {
        this.props.onRequestClose();
    },

    render() {
        return (
            <Modal
                animationType={"slide"}
                transparent={false}
                visible={this.props.isVisible}
                onRequestClose={this.props.onRequestClose}>
                <View style={{marginTop: 22}}>
                    <View>
                        <Text>Are you wearing these pants?</Text>
                        <Button
                            onPress={this.setPantsAsWorn}
                            title="No"
                            accessibilityLabel="You are not wearing pants"
                        />
                        <Button
                            onPress={this.setPantsAsWorn}
                            title="Indeed I Am!"
                            color="#66d8ff"
                            accessibilityLabel="You are wearing pants"
                        />
                    </View>
                </View>
            </Modal>
        );
    }
});

module.exports = PantsSelectionModal;
