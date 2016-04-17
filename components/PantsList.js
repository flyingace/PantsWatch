'use strict';

import React, {
    StyleSheet,
    TouchableOpacity,
    ListView
} from 'react-native';
import PantsListRow from './PantsListRow';

import realm from './realm.js';

// import pantsData from '../pants_data.json';

const PantsList = React.createClass({

    displayName: 'MaxWearsBox',

    propTypes: {
        pantsData: React.PropTypes.object
    },

    getDefaultProps() {
        return null
    },

    getInitialState() {
        return {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            }),
            loaded: true
        };
    },

    componentDidMount() {
        realm.addListener('change', () => {
            this.getAllPants();
        });

        this.getAllPants();
    },

    getAllPants() {
        var self = this;

        let pants = (realm.objects('Pants'));
        let rowSource = (pants) ? pants : pantsData.pants;

        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(rowSource),
            loaded: true
        });
        console.log(pants);
    },

    onRowPress() {
        console.log('press')
    },

    renderPantsList(pants) {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={this.onRowPress}>
                <PantsListRow {...pants} style={{overflow: 'hidden'}}/>
            </TouchableOpacity>
        );
    },

    render() {
        if (!this.state.loaded) {
            return false;
        }

        return (
            <ListView
                removeClippedSubviews={true}
                dataSource={this.state.dataSource}
                renderRow={this.renderPantsList}
                style={{height: this.props.height}}
            />
        );
    }
});

var pantsListStyles = StyleSheet.create({
    pantsList: {}
});

module.exports = PantsList;
