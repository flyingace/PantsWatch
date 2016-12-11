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

const windowDims = Dimensions.get('window');
const titleHeight = 125;


const PantsListView = React.createClass({

    propTypes: {
        pantsList: React.PropTypes.object,
        fetchPantsData: React.PropTypes.func
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
