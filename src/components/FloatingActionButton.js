import React from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    View
} from 'react-native';
import Modal from 'react-native-modal';
import moment from 'moment';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import { HTML_COLORS } from "../constants";
import fontelloConfig from '../config.json';

const Icon = createIconSetFromFontello(fontelloConfig);

class FloatingActionButton extends React.Component {
    constructor() {
        super();
    };

    static propTypes = {
        turnOnForm: PropTypes.func
    };

    static defaultProps = {};

    state = {
        modalIsVisible: false
    };

    toggleModal = (bool) => {
        this.setState({ modalIsVisible: bool })
    };

    //TODO: I don't like the way that the detail page is being updated by manually passing new values to the
    // navigation's params
    onButtonPress = (value) => {
        const pantsId = this.props.pantsId;
        const wearCount = this.props.navigation.state.params.pantsWearCount;
        const { goBack, navigate, setParams } = this.props.navigation;
        const todaysDate = moment().format('L');

        this.toggleModal(false);

        switch (value) {
        case 'wearing':
            this.props.selectPants(pantsId);
            setParams({ pantsWearCount: wearCount + 1, lastWornDate: todaysDate });
            break;
        case 'washed':
            this.props.resetWearCount(pantsId);
            setParams({ pantsWearCount: 0 });
            break;
        case 'update':
            this.props.turnOnForm(true);
            break;
        case 'delete':
            this.props.deletePants(pantsId);
            goBack();
            break;
        default:
            break;
        }
        console.log(this.props);
    };

    render() {
        return (
            <View style={buttonStyle}>
                <Icon name={'menu'} size={14} style={iconStyle} onPress={() => this.toggleModal(true)}/>
                <Modal
                    isVisible={this.state.modalIsVisible}
                    animationIn={'slideInRight'}
                    transparent={true}
                >
                    <Button
                        onPress={() => {
                            this.onButtonPress('wearing')
                        }}
                        title="I am wearing these pants"
                        accessibilityLabel="You are wearing these pants."
                        color="#66d8ff"
                    />
                    <Button
                        onPress={() => {
                            this.onButtonPress('washed')
                        }}
                        title="I just washed these pants"
                        accessibilityLabel="You just washed these pants."
                        color="#66d8ff"
                    />
                    <Button
                        onPress={() => {
                            this.onButtonPress('update')
                        }}
                        title="I want to update the info about these pants"
                        accessibilityLabel="You want to update the info about these pants."
                        color="#66d8ff"
                    />
                    <Button
                        onPress={() => {
                            this.onButtonPress('delete')
                        }}
                        title="I'm done with these pants. Get rid of 'em!"
                        accessibilityLabel="You want to delete these pants."
                        color="#66d8ff"
                    />
                    <Button
                        onPress={() => this.toggleModal(false)}
                        title="Uh, my bad. Nevermind"
                        accessibilityLabel="You don't want to do any of these things and just want to close this window."
                        color="#66d8ff"
                    />
                </Modal>
            </View>
        );
    }
}

const buttonStyle = {
    position: 'absolute',
    top: 10,
    right: 10,
    flex: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderColor: HTML_COLORS.slategray,
    borderWidth: 2,
    borderRadius: 25,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2
};
const iconStyle = { fontSize: 24, textAlign: 'center', color: HTML_COLORS.slategray };
const pickerField = {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 50,
    height: 50,
    backgroundColor: 'rgba(255,255,255,0)'
};


module.exports = FloatingActionButton;