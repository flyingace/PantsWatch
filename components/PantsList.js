'use strict';

const React = require('react');
const {
    StyleSheet,
    TouchableOpacity,
    ListView
    } = require('react-native');
const PantsListRow = require('./PantsListRow');

import realm from './realm';

const PantsList = React.createClass({

    displayName: 'MaxWearsBox',

    propTypes: {
        pantsData: React.PropTypes.object
    },

    getDefaultProps() {
        return {
            pantsName: 'Favorite Pants',
            colorName: 'Blue',
            styleName: 'Casual',
            wearLimit: 0
        };
    },

    getInitialState () {
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
        let pants = (realm.objects('Pants'));
        let rowSource = (pants) ? pants : pantsData.pants;

        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(rowSource),
            loaded: true
        });
        console.log(pants);
    },

    onRowPress () {
        console.log('press')
    },

    renderPantsList (pants) {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={this.onRowPress}>
                <PantsListRow {...pants} style={{overflow: 'hidden'}}/>
            </TouchableOpacity>
        );
    },

    render () {
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

const pantsListStyles = StyleSheet.create({
    pantsList: {}
});

module.exports = PantsList;
