import React from 'react';
import PropTypes from 'prop-types';
import {
    Image,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import Dimensions from 'Dimensions';
import { DBEvents } from 'react-native-db-models';
import Header from './Header';
import PantsListRow from './PantsListRow';
import BackgroundImage from '../../assets/backgrounds/redPlaid.png';

const windowDims = Dimensions.get('window');
const titleHeight = 125;

class PantsListView extends React.Component {

    static propTypes = {
        pantsData: PropTypes.array,
        fetchPantsData: PropTypes.func,
        selectPants: PropTypes.func,
        deletePants: PropTypes.func,
        deselectAllPants: PropTypes.func,
        resetWearCount: PropTypes.func
    };

    static defaultProps = {
        pantsData: []
    };

    componentWillMount() {
        this.props.fetchPantsData();
    }

    componentDidMount() {
        DBEvents.on('all', this.props.fetchPantsData);
    }

    renderListItem = ({ item }) => {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={ () => this.onRowPress(item) }>
                <PantsListRow {...item} />
            </TouchableOpacity>
        )
    };

    onRowPress = (pantsData) => {
        this.props.navigation.navigate('Details', { ...pantsData });
    };

    render() {
        return (
            <View>
                <Header navigation={this.props.navigation} pageTitle='See Your Pants'/>
                <FlatList data={this.props.pantsData}
                          renderItem={this.renderListItem}
                          keyExtractor={(item, index) => index}
                />
            </View>
        );

    }
}

const styles = StyleSheet.create({
    backgroundImage: {
        position: 'absolute'
    },
});

module.exports = PantsListView;
