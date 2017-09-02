import { DrawerNavigator } from 'react-navigation';

import Landing from '../components/Landing';
import PantsFormPage from '../containers/PantsFormPage';
import PantsListPage from '../containers/PantsListPage';
import SettingsPage from '../containers/SettingsPage';

export const Drawer = DrawerNavigator(
    //RouteConfig
    {
        Home: {
            screen: Landing,
            navigationOptions: {
                drawerLabel: 'Home',
            }
        },
        ViewPants: {
            screen: PantsListPage,
            navigationOptions: {
                drawerLabel: 'See Your Pants',
                title: 'View Your Pants',
            }
        },
        AddPants: {
            screen: PantsFormPage,
            navigationOptions: {
                drawerLabel: 'Add Some Pants',
                params: {}
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