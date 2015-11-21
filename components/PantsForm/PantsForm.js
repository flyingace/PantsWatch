/*globals */

'use strict';

var React = require('react-native');
const {
    StyleSheet,
    View
    } = React;
const FormDropDown = require('../FormDropDown/FormDropDown');

var PantsForm = React.createClass({

    propTypes: {
        pantsData: React.PropTypes.object
    },

    getDefaultProps() {
        return {
            pantsName: 'Favorite Pants',
            colorName: 'Blue',
            styleName: 'Casual',
            wearLimit: 0
        };
    },

    getInitialState: function () {
        return null;
    },

    componentDidMount: function () {
    },

    render: function () {
        return (
            <View style={styles.formWrapper}>
                <FormDropDown labelText='Pants State' defaultValue='Pick the state your pants were born in.' />
            </View>
        );
    }
});

var styles = StyleSheet.create({
    formWrapper: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        alignSelf: 'stretch'
    }
});

module.exports = PantsForm;

