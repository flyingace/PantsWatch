/*globals */

const React = require('react-native');
const { Image, LayoutAnimation, StyleSheet, Text, View } = React;
const Dimensions = require('Dimensions');
const Pane = require('./Pane');

const PantsListView = require('./PantsListView');
const PantsForm = require('./PantsForm');
const Patches = require('./Patches');
const Settings = require('./Settings');

const windowDims = Dimensions.get('window');

const Landing = React.createClass({

    displayName: 'Landing',

    propTypes: {},

    getDefaultProps: function () {
    },

    getInitialState: function () {
        return {
            questionText: 'What Pants Are You Going To Wear Today?',
            menu: 'hidden'
        }
    },

    componentDidMount: function () {
    },

    componentWillUnmount: function () {
    },

    onPanePress: function (itemName) {
        const nav = this.props.navigator;

        console.log(itemName);
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        switch (itemName) {
            case 'landing':
                nav.push({component: Landing, name: 'Home'});
                break;
            case 'choosePants':
                nav.replace({component: PantsListView, name: 'Choose Pants'});
                break;
            case 'addPants':
                nav.replace({component: PantsForm, name: 'Add Pants'});
                break;
            case 'editPants':
                nav.replace({component: PantsForm, name: 'Edit Pants'});
                break;
            case 'washPants':
                nav.replace({component: PantsListView, name: 'Wash Pants'});
                break;
            case 'patches':
                nav.replace({component: Patches, name: 'Wash Pants'});
                break;
            case 'appSettings':
                nav.replace({component: Settings, name: 'Wash Pants'});
                break;
            default:
                nav.replace({component: Landing, name: 'Home'});
                break;
        }
    },

    render: function () {
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>
                        Pants Watch
                    </Text>
                </View>
                <View>
                    <Text style={styles.prompt}>
                        {this.state.questionText}
                    </Text>
                </View>
                <View style={styles.panels}>
                    <Pane paneLabel="See Your Pants" onPress={() => this.onPanePress('choosePants')}/>
                    <Pane paneLabel="Add Some Pants" onPress={() => this.onPanePress('addPants')}/>
                    <Pane paneLabel="Alter Your Pants" onPress={() => this.onPanePress('editPants')}/>
                    <Pane paneLabel="Wash Your Pants" onPress={() => this.onPanePress('washPants')}/>
                    <Pane paneLabel="Patches" onPress={() => this.onPanePress('patches')}/>
                    <Pane paneLabel="Settings" onPress={() => this.onPanePress('settings')}/>
                </View>
            </View>
        );
    }
});

var styles = StyleSheet.create(
    {
        container: {
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            backgroundColor: '#15A8E0'
        },
        title: {
            fontFamily: 'HappyFox-Condensed',
        },
        prompt: {
            fontFamily: 'HappyFox-Condensed',
        },
        panels: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            width: windowDims.width
        },
        pane: {}
    }
);

module.exports = Landing;