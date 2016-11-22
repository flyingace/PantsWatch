'use strict';

import React from 'react';
import {
    Image,
    ListView,
    StyleSheet,
    View
} from 'react-native';
import Dimensions from 'Dimensions';
import PantsList from './PantsList';
import BackgroundImage from '../../assets/backgrounds/redPlaid.png';
import PageTitle from '../../assets/page_titles/addFormTitle.png';

import pantsData from '../../pants_data.json';

import DB from '../../db.js';
import { DBEvents } from 'react-native-db-models';

const windowDims = Dimensions.get('window');
const titleHeight = 125;


const PantsListView = React.createClass({

    propTypes: {
        pantsData: React.PropTypes.object
    },

    getDefaultProps() {
        return null
    },

    getInitialState () {
        return {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            }),
            loaded: true
        };
    },

    componentDidMount: function () {
        let self = this;
        DBEvents.on('all', function () {
            self.getAllPants();
        });

        this.getAllPants();
    },

    getAllPants: function () {
        const self = this;
        let rowSource;
        DB.pants.get_all(function (result) {
            rowSource = (result.totalrows > 0) ? result.rows : pantsData.pants;
            self.setState({
                dataSource: self.state.dataSource.cloneWithRows(rowSource),
                loaded: true
            });
            console.log(result);
        });
    },

    render() {
        if (!this.state.loaded) {
            return false;
        }

        return (
            <View>
                <Image source={BackgroundImage} style={styles.backgroundImage}/>
                <Image source={PageTitle} style={styles.pageTitle} resizeMode={'contain'}/>
                <PantsList
                    height={windowDims.height - titleHeight}
                    dataSource={this.state.dataSource}
                    style={styles.pantsList}
                />
            </View>
        );
    }
});

const styles = StyleSheet.create({
    wrapper: {
        justifyContent: 'space-between'
    },
    backgroundImage: {
        position: 'absolute'
    },
    pageTitle: {
        marginTop: 12,
        alignSelf: 'center',
        resizeMode: 'contain',
        height: titleHeight
    },
    pantsList: {}
});

module.exports = PantsListView;
