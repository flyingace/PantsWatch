import React from 'react';
import {
    Navigator,
    NavigatorSceneConfigs,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import DB from '../../db';
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
        this.setDefaultDBValues();
    },

    componentWillUnmount() {
    },

    setDefaultDBValues() {
        // if (!DB.brands.rows) {
        //     DB.brands.add({ label: 'Levi\'s', value: 'levis' });
        //     DB.brands.add({ label: 'J. Crew', value: 'jCrew' });
        //     DB.brands.add({ label: 'Banana Republic', value: 'bananaRepublic' });
        //     DB.brands.add({ label: 'GAP', value: 'gap' });
        // }

        DB.colors.erase_db();

        // if (!DB.colors.rows) {
        //     DB.colors.add({ label: 'Blue', value: 'blue' });
        //     DB.colors.add({ label: 'Green', value: 'green' });
        //     DB.colors.add({ label: 'Black', value: 'black' });
        // }
        if (!DB.styles.rows) {
            DB.styles.add({ label: 'Casual', value: 'casual' });
            DB.styles.add({ label: 'Work', value: 'work' });
            DB.styles.add({ label: 'Night Life', value: 'nightLife' });
            DB.styles.add({ label: 'Workout', value: 'workout' });
        }

    },

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    },

    updateMenuState(isOpen) {
        this.setState({ isOpen });
    },

    closeMenu() {
        this.setState({ isOpen: false });
    },

    _renderScene(route, navigator) {
        const Component = route.component;
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