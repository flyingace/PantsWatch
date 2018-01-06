import { DrawerNavigator, StackNavigator } from 'react-navigation';
import React from 'react';

import Landing from '../components/Landing';
import PantsFormPage from '../containers/PantsFormPage';
import PantsListPage from '../containers/PantsListPage';
import SettingsPage from '../containers/SettingsPage';
import {MenuIcon} from '../components/MenuIcon';


export const ListStack = StackNavigator({
    Feed: {
        screen: PantsListPage,
        navigationOptions: ({ navigation }) => {
            return {
                title: 'See Your Pants',
                headerLeft: <MenuIcon navigation={navigation}/>
            }
        }
    },
    Details: {
        screen: PantsFormPage,
        navigationOptions: ({ navigation }) => {
            return {
                title: `${navigation.state.params.pantsName.toUpperCase()}`
            }
        }
    }
});

export const AddStack = StackNavigator({
    AddPage: {
        screen: PantsFormPage,
        navigationOptions: ({ navigation }) => {
            return {
                title: 'Add Some Pants',
                headerLeft: <MenuIcon navigation={navigation}/>
            }
        }
    }
});

export const WashStack = StackNavigator({
    Feed: {
        screen: PantsListPage,
        navigationOptions: ({ navigation }) => {
            return {
                title: 'Wash Your Pants',
                headerLeft: <MenuIcon navigation={navigation}/>
            }
        }
    }
});

export const SettingsStack = StackNavigator({
    Feed: {
        screen: SettingsPage,
        navigationOptions: ({ navigation }) => {
            return {
                title: 'Settings',
                headerLeft: <MenuIcon navigation={navigation}/>
            }
        }
    }
});


export const Drawer = DrawerNavigator(
    //RouteConfig
    {
        Home: {
            screen: Landing,
            navigationOptions: {
                title: 'Home',
                tabBarVisible: false
            }
        },
        PantsList: {
            screen: ListStack
        },
        AddPants: {
            screen: AddStack
        },
        WashPants: {
            screen: WashStack
        },
        Settings: {
            screen: SettingsStack
        }
    },
    //DrawerNavigatorConfig
    {
        drawerWidth: 300,
        drawerOpenRoute: 'DrawerOpen',
        drawerCloseRoute: 'DrawerClose',
        drawerToggleRoute: 'DrawerToggle'
    }
);
