import React, {
    Navigator,
    NavigatorSceneConfigs,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import Dimensions from 'Dimensions';
import Menu from './Menu';
import Landing from './Landing';

const window = Dimensions.get('window');

const Application = React.createClass({

    displayName: 'Application',

    propTypes: {},

    getDefaultProps() {
    },

    getInitialState() {
        return {
            isOpen: false
        }
    },

    componentDidMount() {
    },

    componentWillUnmount() {
    },

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    },

    updateMenuState(isOpen) {
        this.setState({isOpen});
    },

    closeMenu() {
        this.setState({isOpen: false});
    },

    _renderScene(route, navigator) {
        var Component = route.component;
        return (
            <Component {...route.props} navigator={navigator} route={route}/>
        );
    },

    render() {

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