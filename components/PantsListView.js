'use strict';

import React, {
    Image,
    ListView,
    StyleSheet,
    View
} from 'react-native';
import Dimensions from 'Dimensions';
import PantsList from './PantsList';
import realm from './realm.js';

import BackgroundImage from '../assets/backgrounds/redPlaid.png';
import PageTitle from '../assets/page_titles/addFormTitle.png';
import pantsData from '../pants_data.json';

const windowDims = Dimensions.get('window');
const titleHeight = 125;

const PantsListView = React.createClass({

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
        const pants = realm.objects('Pants');
            let rowSource = (pants.totalrows > 0) ? pants.rows : pantsData.pants;
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(rowSource),
                loaded: true
            });
    },

    render() {
        if (!this.state.loaded) {
            return false;
        }

        return (
            <View style="">
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

var styles = StyleSheet.create({
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
    pantsList: {
    }
});

module.exports = PantsListView;
