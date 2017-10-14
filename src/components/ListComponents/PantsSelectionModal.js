import React from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    Modal,
    Text,
    View
} from 'react-native';
import PantsForm from '../FormComponents/PantsForm';

class PantsSelectionModal extends React.Component {
    
    render() {
        return (
            <Modal
                animationType={ 'slide' }
                transparent={ false }
                visible={ this.props.isVisible }
                onRequestClose={ this.props.onRequestClose }>
                <View style={ { marginTop: 22 } }>
                    <View>
                        <Text>What would you like to do?</Text>
                        <Button
                            onPress={ this.props.onPantsSelection }
                            title="I am wearing these pants"
                            color="#66d8ff"
                            accessibilityLabel="You are wearing these pants."
                        />
                        <Button
                            onPress={ this.props.onPantsWash }
                            title="I just washed these pants"
                            color="#66d8ff"
                            accessibilityLabel="You just washed these pants."
                        />
                        <Button
                            onPress={ this.props.onPantsEdit }
                            title="I want to update the info about these pants"
                            color="#66d8ff"
                            accessibilityLabel="You want to update the info about these pants."
                        />
                        <Button
                            onPress={ this.props.onPantsDelete }
                            title="I'm done with these pants. Get rid of 'em!"
                            color="#66d8ff"
                            accessibilityLabel="You want to delete these pants."
                        />
                        <Button
                            onPress={ this.props.onRequestClose }
                            title="Uh, my bad. Nevermind"
                            color="#66d8ff"
                            accessibilityLabel="You don't want to do any of these things and just want to close this window."
                        />
                    </View>
                </View>
            </Modal>
        );
    }
}

PantsSelectionModal.propTypes = {
    isOpen: PropTypes.bool,
    onRequestClose: PropTypes.func,
    onPantsSelection: PropTypes.func,
    onPantsEdit: PropTypes.func,
    onPantsWash: PropTypes.func,
    onPantsDelete: PropTypes.func
};

PantsSelectionModal.defaultProps = {
    isOpen: false
};

module.exports = PantsSelectionModal;
