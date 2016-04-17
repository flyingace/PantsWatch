import React, {
    Navigator,
    View
} from 'react-native';
import {
    Router,
    Route,
    Schema,
    Animations
} from 'react-native-router-flux';

import Landing from '../Landing';
import PantsForm from '../PantsForm';
import PantsListView from '../PantsListView';
import Patches from '../Patches';
import Settings from '../Settings';

const RouterConfig = React.createClass({

    displayName: 'Router',

    propTypes: {},

    getDefaultProps() {
    },

    getInitialState() {
        return null;
    },

    componentDidMount() {
    },

    componentWillUnmount() {
    },

    render() {
        return (
            <Router hideNavBar={true} initialRoutes={['landing']}>
                <Schema name="modal" sceneConfig={Navigator.SceneConfigs.FloatFromBottom}/>
                <Schema name="default" sceneConfig={Navigator.SceneConfigs.FadeAndroid}/>
                <Schema name="withoutAnimation"/>

                <Route name="landing" component={Landing} title="Launch" hideNavBar={true}/>
                <Route name="choosePants" component={PantsListView} title="Choose Your Pants"/>
                <Route name="seePants" component={PantsListView} title="See Your Pants"/>
                <Route name="addPants" component={PantsForm} title="Add Some Pants" type="switch"/>
                <Route name="editPants" component={PantsForm} title="Alter Your Pants"/>
                <Route name="washPants" component={PantsForm} title="Wash Your Pants"/>
                <Route name="patches" component={Patches} title="Patches"/>
                <Route name="appSettings" component={Settings} title="Settings"/>
            </Router>
        );
    }
});

module.exports = RouterConfig;
