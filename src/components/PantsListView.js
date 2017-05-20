'use strict';

import React from 'react';
import {
    Image,
    ListView,
    StyleSheet,
    View
} from 'react-native';
import Dimensions from 'Dimensions';
import {DBEvents} from 'react-native-db-models';
import PantsList from './PantsList';
import BackgroundImage from '../../assets/backgrounds/redPlaid.png';
import PageTitle from '../../assets/page_titles/addFormTitle.png';

const windowDims = Dimensions.get('window');
const titleHeight = 125;


const PantsListView = React.createClass({

    propTypes: {
        pantsList: React.PropTypes.object,
        fetchPantsData: React.PropTypes.func,

        selectPants: React.PropTypes.func,
        deletePants: React.PropTypes.func,
        deselectAllPants: React.PropTypes.func,
        resetWearCount: React.PropTypes.func
    },

    getDefaultProps () {
        return null
    },

    getInitialState () {
        return {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            })
        };
    },

    componentWillMount () {
        this.props.fetchPantsData();
    },

    componentDidMount () {
        this.getListDataSource();
        //TODO: This should be changed to a function
        //which determines which db has been affected
        DBEvents.on('all', this.props.fetchPantsData);
    },

    componentWillReceiveProps(newProps) {
        this.getListDataSource(newProps)
    },

    getListDataSource (newProps) {
        let rowSource;
        if (newProps) {
            rowSource = newProps.pantsList.pantsData.rows;
        } else if (this.props.pantsList.pantsData.rows) {
            rowSource = this.props.pantsList.pantsData.rows;
        } else {
            rowSource = {};
        }
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(rowSource)
        });
    },

    render() {
        return (
            <View>
                <Image source={BackgroundImage} style={styles.backgroundImage}/>
                <Image source={PageTitle} style={styles.pageTitle} resizeMode={'contain'}/>
                <PantsList
                    height={windowDims.height - titleHeight}
                    dataSource={this.state.dataSource}
                    style={styles.pantsList}
                    {...this.props}
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
