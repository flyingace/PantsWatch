import React from 'react';
import {
    Button,
    StyleSheet,
    View,
    Text
} from 'react-native';
import PropTypes from 'prop-types';
import DB from '../../db';
import Dimensions from 'Dimensions';
import { Drawer } from '../config/router';


const window = Dimensions.get('window');

//Remember that these will be added to the DB and returned as objects, not arrays
const BRANDS = [
    { value: 'Banana Republic' },
    { value: 'GAP' },
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

    componentDidMount() {
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

    render() {
        return (
            <Drawer />
        );
    }
}

const styles = StyleSheet.create({
    navigator: {
        flex: 1
    }
});

module.exports = Application;