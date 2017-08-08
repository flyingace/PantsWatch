import { TabNavigator } from 'react-navigation';

import Landing from '../components/Landing';
import PantsFormPage from '../containers/PantsFormPage';
import PantsListPage from '../containers/PantsListPage';

export const Tabs = TabNavigator({
    Home: {
        screen: Landing,
        navigationOptions: {
            tabBarLabel: 'Home'
        }
    },
    ViewPants: {
        screen: PantsListPage,
        navigationOptions: {
            tabBarLabel: 'View'
        }
    },
    AddPants: {
        screen: PantsFormPage,
        navigationOptions: {
            tabBarLabel: 'Add'
        }
    },
    EditPants: {
        screen: PantsFormPage,
        navigationOptions: {
            tabBarLabel: 'Edit'
        }
    },
    WashPants: {
        screen: PantsListPage,
        navigationOptions: {
            tabBarLabel: 'Wash'
        }
    },
},
{
    tabBarOptions: {
        activeTintColor: '#e91e63',
    }
});