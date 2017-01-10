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
        onRequestClose: React.PropTypes.func,
        onPantsSelection: React.PropTypes.func,
        onPantsWash: React.PropTypes.func,
        onPantsDelete: React.PropTypes.func
    },

    getDefaultProps() {
        return {
            isOpen: false
        }
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
                        <Text>What would you like to do?</Text>
                        <Button
                            onPress={this.props.onPantsSelection}
                            title="I am wearing these pants"
                            color="#66d8ff"
                            accessibilityLabel="You are wearing these pants."
                        />
                        <Button
                            onPress={this.props.onPantsWash}
                            title="I just washed these pants"
                            color="#66d8ff"
                            accessibilityLabel="You just washed these pants."
                        />
                        <Button
                            onPress={this.props.onRequestClose}
                            title="I want to update the info about these pants"
                            color="#66d8ff"
                            accessibilityLabel="You want to update the info about these pants."
                        />
                        <Button
                            onPress={this.props.onPantsDelete}
                            title="I'm done with these pants. Get rid of 'em!"
                            color="#66d8ff"
                            accessibilityLabel="You want to delete these pants."
                        />
                        <Button
                            onPress={this.props.onRequestClose}
                            title="Uh, my bad. Nevermind"
                            color="#66d8ff"
                            accessibilityLabel="You don't want to do any of these things and just want to close this window."
                        />
                    </View>
                </View>
            </Modal>
        );
    }
});

module.exports = PantsSelectionModal;
