const React = require('react');
const {
    Navigator,
    NavigatorSceneConfigs,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
    } = require('react-native');
const Dimensions = require('Dimensions');
const Menu = require('./Menu');
const Landing = require('./Landing');

const window = Dimensions.get('window');

const Application = React.createClass({

    displayName: 'Application',

    propTypes: {},

    getDefaultProps: function () {
    },

    getInitialState: function () {
        return {
            isOpen: false
        }
    },

    componentDidMount: function () {
    },

    componentWillUnmount: function () {
    },

    toggle: function () {
        this.setState({
            isOpen: !this.state.isOpen
        });
    },

    updateMenuState: function (isOpen) {
        this.setState({isOpen});
    },

    closeMenu: function () {
        this.setState({isOpen: false});
    },

    _renderScene(route, navigator) {
        var Component = route.component;
        return (
            <Component {...route.props} navigator={navigator} route={route}/>
        );
    },

    render: function () {

        return (
            <Navigator
                initialRoute={{
                    component: Landing,
                    name: 'Landing'
                    }}
                style={styles.navigator}
                configureScene={() => {
                    return Navigator.SceneConfigs.FloatFromRight;
                }}
                renderScene={this._renderScene}
                navigator={navigator}
                navigationBar={<Menu />}
            />
        );
    }
});

const styles = StyleSheet.create({
    navigator: {
        flex: 1,
        width: window.width,
        height: window.height
    }
});

module.exports = Application;