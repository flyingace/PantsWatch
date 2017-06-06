import React from 'react';
import {
    Navigator,
    StyleSheet
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
        };
    },

    componentDidMount() {
        this.setDefaultDBValues();
    },

    componentWillUnmount() {
    },

    /**
     * Check to see if picker values are empty when app starts.
     * If so, load default values.
     */
    setDefaultDBValues() {

        DB.brands.get_all(function (response) {
            if (response.totalrows === 0) {
                DB.brands.add_all(BRANDS, (addedValues) => {
                    console.log(addedValues);
                });
            }
        });

        DB.colors.get_all(function (response) {
            if (response.totalrows === 0) {
                DB.colors.add_all(COLORS, (addedValues) => {
                    console.log(addedValues);
                });
            }
        });

        DB.styles.get_all(function (response) {
            if (response.totalrows === 0) {
                DB.styles.add_all(STYLES, (addedValues) => {
                    console.log(addedValues);
                });
            }
        });
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
            <Component { ...route.props } navigator={ navigator } route={ route }/>
        );
    },

    render() {

        return (
            <Navigator
                initialRoute={ {
                    component: Landing,
                    name: 'Landing'
                } }
                style={ styles.navigator }
                configureScene={ () => {
                    return Navigator.SceneConfigs.FloatFromRight;
                } }
                renderScene={ this._renderScene }
                navigator={ navigator }
                navigationBar={ <Menu /> }
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