import React from 'react';
import PropTypes from 'prop-types';
import {
    FlatList,
    TouchableOpacity,
    View
} from 'react-native';
import { DBEvents } from 'react-native-db-models';
import PantsListRow from './PantsListRow';

class PantsListView extends React.Component {

    static propTypes = {
        pantsData: PropTypes.array,
        fetchPantsData: PropTypes.func
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
                <FlatList data={this.props.pantsData}
                          renderItem={this.renderListItem}
                          keyExtractor={(item, index) => index}
                />
            </View>
        );

    }
}

module.exports = PantsListView;
