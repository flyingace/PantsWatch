const React = require('react-native');
const {
    Navigator,
    View
    } = React;

const {
    Router,
    Route,
    Schema,
    Animations
    } = require('react-native-router-flux');

const Landing = require('../Landing');
const PantsForm = require('../PantsForm');
const PantsListView = require('../PantsListView');
const Patches = require('../Patches');
const Settings = require('../Settings');

const RouterConfig = React.createClass({

    displayName: 'Router',

    propTypes: {},

    getDefaultProps: function () {
    },

    getInitialState: function () {
        return null;
    },

    componentDidMount: function () {
    },

    componentWillUnmount: function () {
    },

    render: function () {
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
