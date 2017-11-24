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
import { DEFAULT_BRANDS, DEFAULT_COLORS, DEFAULT_STYLES } from "../constants";


const window = Dimensions.get('window');

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
                DB.brands.add_all(DEFAULT_BRANDS, (addedValues) => {
                    console.log(addedValues);
                });
            }
        });

        DB.colors.get_all(function (response) {
            if (response.totalrows === 0) {
                DB.colors.add_all(DEFAULT_COLORS, (addedValues) => {
                    console.log(addedValues);
                });
            }
        });

        DB.styles.get_all(function (response) {
            if (response.totalrows === 0) {
                DB.styles.add_all(DEFAULT_STYLES, (addedValues) => {
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