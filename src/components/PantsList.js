import React from 'react';
import PropTypes from 'prop-types';
import {
    TouchableOpacity,
    ListView,
    View
} from 'react-native';
import PantsListRow from './PantsListRow';
import PantsSelectionModal from './PantsSelectionModal';

let pantsId;

class PantsList extends React.Component {
    constructor() {
        super();
    };

    static propTypes = {
        selectPants: PropTypes.func,
        washPants: PropTypes.func,
        deletePants: PropTypes.func,
        dataSource: PropTypes.object
    };

    state = {
        modalIsOpen: false,
        selectedPants: ''
    };

    onRowPress = (pantsData) => {
        pantsId = pantsData._id;
        this.setState({ modalIsOpen: true });
    };

    onPantsSelection = () => {
        this.props.selectPants(pantsId);
        this.closeModal();
    };

    onPantsWash = () => {
        this.props.resetWearCount(pantsId);
        this.closeModal();
    };

    onPantsEdit = () => {
        const { navigate } = this.props.navigation;

        navigate('AddPants', { updateId: pantsId });

        this.closeModal();
    };

    onPantsDelete = () => {
        this.props.deletePants(pantsId);
        this.closeModal();
    };

    openModal = () => {
        this.setState({ modalIsOpen: true });
    };

    closeModal = () => {
        this.setState({ modalIsOpen: false });
    };

    renderPantsList = (pantsData) => {
        return (
            <TouchableOpacity
                activeOpacity={ 0.8 }
                onPress={ () => this.onRowPress(pantsData) }>
                <PantsListRow { ...pantsData } style={ { overflow: 'hidden' } }/>
            </TouchableOpacity>
        );
    };

    render = () => {
        return (
            <View>
                <ListView
                    removeClippedSubviews={ true }
                    dataSource={ this.props.dataSource }
                    renderRow={ this.renderPantsList }
                    style={ { height: this.props.height } }
                    enableEmptySections={ true }
                />
                <PantsSelectionModal
                    isVisible={ this.state.modalIsOpen }
                    onPantsSelection = { this.onPantsSelection }
                    onPantsWash = { this.onPantsWash }
                    onPantsEdit = { this.onPantsEdit }
                    onPantsDelete = { this.onPantsDelete }
                    onRequestClose={ this.closeModal }
                />
            </View>
        );
    }
}

module.exports = PantsList;
