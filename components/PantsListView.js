'use strict';

var React = require('react');
const {
    Image,
    ListView,
    StyleSheet,
    View
    } = require('react-native');
const Dimensions = require('Dimensions');
const PantsList = require('./PantsList');

const BackgroundImage = require('../assets/backgrounds/redPlaid.png');
const PageTitle = require('../assets/page_titles/addFormTitle.png');
const windowDims = Dimensions.get('window');
const titleHeight = 125;

const DB = require('../db.js');
const DBEvents = require('react-native-db-models').DBEvents;

let pantsData = require('../pants_data.json');

const PantsListView = React.createClass({

    propTypes: {
        pantsData: React.PropTypes.object
    },

    getDefaultProps() {
        return null
    },

    getInitialState: function () {
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
        var self = this;
        var rowSource;
        DB.pants.get_all(function (result) {
            rowSource = (result.length > 0) ? result.rows : pantsData.pants;
            self.setState({
                dataSource: self.state.dataSource.cloneWithRows(rowSource),
                loaded: true
            });
            console.log(result);
        });
    },

    render: function () {
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
