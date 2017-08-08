import React from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';
import PropTypes from 'prop-types';
import DB from '../../db';
import Dimensions from 'Dimensions';
import Menu from './Menu';
import Landing from './Landing';
import { Tabs } from '../config/router';


const window = Dimensions.get('window');

//Remember that these will be added to the DB and returned as objects, not arrays
const BRANDS = [
    { value: 'GAP' },
    { value: 'Banana Republic' },
    { value: 'J. Crew' },
    { value: 'Levi\'s' }
];
const COLORS = [
    { value: 'Black' },
    { value: 'Green' },
    { value: 'Blue' }
];
const STYLES = [
    { value: 'Workout' },
    { value: 'Night Life' },
    { value: 'Work' },
    { value: 'Casual' }
];

class Application extends React.Component {

    static propTypes = {
        label: PropTypes.string
    };

    static defaultProps = {
    };

    state = {
        isOpen: false
    };

    componentDidMount() {
        console.log('finally');
        this.setDefaultDBValues();
    }

    componentWillUnmount() {
    }

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
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    updateMenuState(isOpen) {
        this.setState({ isOpen });
    }

    closeMenu() {
        this.setState({ isOpen: false });
    }

    _renderScene(route, navigator) {
        const Component = route.component;
        return (
            <Component { ...route.props } navigator={ navigator } route={ route }/>
        );
    }

    render() {

        return (
            /*<Navigator
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
            /> */
            <Tabs />
        );
    }
}

const styles = StyleSheet.create({
    navigator: {
        flex: 1
    }
});

module.exports = Application;