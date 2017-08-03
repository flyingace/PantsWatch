import React from 'react';
import {
    TabBarIOS
} from 'react-native';
import PropTypes from 'prop-types';
import PantsForm from '../PantsForm';
import Landing from '../Landing';
import PantsListView from '../PantsListView';

class TabBar extends React.Component {


    getDefaultProps() {
    }

    getInitialState() {
        return {
            selectedTab: 'homeTab'
        };
    }

    render() {
        return (
            <TabBarIOS
                tintColor="white"
                barTintColor="darkslateblue">
                <TabBarIOS.Item
                    title="Home"
                    systemIcon="favorites"
                    selected={ this.state.selectedTab === 'homeTab' }
                    onPress={ () => {
                        this.setState({
                            selectedTab: 'homeTab'
                        });
                    } }>
                    <Landing />
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    systemIcon="history"
                    selected={ this.state.selectedTab === 'redTab' }
                    onPress={ () => {
                        this.setState({
                            selectedTab: 'redTab'
                        });
                    } }>
                    <PantsForm />
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    title="More"
                    systemIcon="bookmarks"
                    selected={ this.state.selectedTab === 'greenTab' }
                    onPress={ () => {
                        this.setState({
                            selectedTab: 'greenTab'
                        });
                    } }>
                    <PantsListView />
                </TabBarIOS.Item>
            </TabBarIOS>
        );
    }
}

TabBar.propTypes = {};

module.exports = TabBar;
