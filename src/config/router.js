import { DrawerNavigator, StackNavigator } from 'react-navigation';

import Landing from '../components/Landing';
import PantsFormPage from '../containers/PantsFormPage';
import PantsListPage from '../containers/PantsListPage';
import SettingsPage from '../containers/SettingsPage';
import PantsDetailPage from '../containers/PantsDetailPage';

export const PantsStack = StackNavigator({
    Feed: {
        screen: PantsListPage,
        navigationOptions: {
            title: 'View Your Pants',
        }
    },
    Details: {
        screen: PantsFormPage,
        navigationOptions: ({navigation}) => ({
            title: `${navigation.state.params.pantsName.toUpperCase()}`
        })
    },
});

export const Drawer = DrawerNavigator(
    //RouteConfig
    {
        Home: {
            screen: Landing,
            navigationOptions: {
                drawerLabel: 'Home',
            }
        },
        PantsList: {
            screen: PantsStack,
            navigationOptions: {
                drawerLabel: 'See Your Pants',
            }
        },
        AddPants: {
            screen: PantsFormPage,
            navigationOptions: {
                drawerLabel: 'Add Some Pants'
            }
        },
        WashPants: {
            screen: PantsListPage,
            navigationOptions: {
                drawerLabel: 'Wash Your Pants'
            }
        },
        Settings: {
            screen: SettingsPage,
            navigationOptions: {
                drawerLabel: 'Settings'
            }
        }
    },
    //DrawerNavigatorConfig
    {
        drawerWidth: 150,
        contentOptions: {
            activeTintColor: '#e91e63',
            activeBackgroundColor: 'lightgrey'
        }
    }
);