/*globals */

var React = require('react-native');
var { StyleSheet, TabBarIOS, View, Text } = React;
const PantsForm = require('../PantsForm/PantsForm');
const Landing = require('../Landing/Landing');
const PantsListView = require('../PantsListView/PantsListView');

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
                    badge={this.state.notifCount > 0 ? this.state.notifCount : undefined}
                    selected={this.state.selectedTab === 'redTab'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'redTab',
                            notifCount: this.state.notifCount + 1
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
                            selectedTab: 'greenTab',
                            presses: this.state.presses + 1
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
