'use strict';

const React = require('react');
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


let pantsData = require('../pants_data.json');

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

    getAllPants () {
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
    pantsList: {
    }
});

module.exports = PantsListView;
