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

const Landing = require('../Landing/Landing');
const PantsForm = require('../PantsForm/PantsForm');
const PantsListView = require('../PantsListView/PantsListView');
const Patches = require('../Patches/Patches');
const Settings = require('../Settings/Settings');

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
                <Schema name="default" sceneConfig={Navigator.SceneConfigs.FloatFromRight}/>
                <Schema name="withoutAnimation"/>

                <Route name="landing" component={Landing} wrapRouter={true} title="Launch" hideNavBar={true}/>
                <Route name="choosePants" component={PantsListView} title="Choose Your Pants" type="replace"/>
                <Route name="seePants" component={PantsListView} title="See Your Pants" type="replace"/>
                <Route name="addPants" component={PantsForm} title="Add Some Pants"/>
                <Route name="editPants" component={PantsForm} title="Alter Your Pants" type="replace"/>
                <Route name="washPants" component={PantsForm} title="Wash Your Pants" type="replace"/>
                <Route name="patches" component={Patches} title="Patches" type="replace"/>
                <Route name="appSettings" component={Settings} title="Settings" type="replace"/>
            </Router>
        );
    }
});

module.exports = RouterConfig;
