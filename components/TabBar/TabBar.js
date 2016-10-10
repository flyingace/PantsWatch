/*globals */

var React = require('react');
var { StyleSheet, TabBarIOS, View, Text } = require('react-native');
const PantsForm = require('../PantsForm');
const Landing = require('../Landing');
const PantsListView = require('../PantsListView');

var TabBar = React.createClass({

    displayName: 'TabBar',

    propTypes: {},

    getDefaultProps: function () {
    },

    getInitialState: function () {
        return {
            selectedTab: 'homeTab'
        };
    },

    render: function () {
        return (
            <TabBarIOS
                tintColor="white"
                barTintColor="darkslateblue">
                <TabBarIOS.Item
                    title="Home"
                    systemIcon="favorites"
                    selected={this.state.selectedTab === 'homeTab'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'homeTab'
                        });
                    }}>
                    <Landing />
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    systemIcon="history"
                    selected={this.state.selectedTab === 'redTab'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'redTab'
                        });
                    }}>
                    <PantsForm />
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    title="More"
                    systemIcon="bookmarks"
                    selected={this.state.selectedTab === 'greenTab'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'greenTab'
                        });
                    }}>
                    <PantsListView />
                </TabBarIOS.Item>
            </TabBarIOS>

        );
    }
});

var styles = StyleSheet.create({
    tabContent: {
        alignSelf: 'stretch',
        height: 200,
        flex: 1
    },
    tabText: {
        color: 'white',
        margin: 50,
        flex: 1
    }
});

module.exports = TabBar;
