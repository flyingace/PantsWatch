/*globals */

'use strict';

var React = require('react-native');
const {
    StyleSheet,
    View
} = React;
const Button = require('../Button/Button');
const FormTextInput = require('../FormTextInput/FormTextInput');
const FormDropDown = require('../FormDropDown/FormDropDown');

var PantsForm = React.createClass({

    propTypes: {
        pantsData: React.PropTypes.object
    },

    getDefaultProps() {
        return null;
    },

    getInitialState: function () {
        return null;
    },

    componentDidMount: function () {},

    _handlePress: function () {
        console.log('Pressed!');
    },

    render: function () {
        return (
            <View style = { styles.formWrapper }>
                <FormTextInput labelText='Name' placeholderText='Choose a name for your pants.' />
                <FormTextInput labelText='Color' placeholderText='What color are your pants?' />
                <FormTextInput labelText='Brand' placeholderText='What brand are your pants?' />
                <FormTextInput labelText='Style' placeholderText='What would you call the style of these pants?' />
                <FormTextInput labelText='Max Wears' />
                <FormTextInput labelText='Added On' />
                <FormTextInput labelText='Notes' placeholderText='A place for notes about your pants.' />
                <Button buttonText="Submit Your Pants" />
            </View>
        );
    }
});

var styles = StyleSheet.create({
    formWrapper: {
        backgroundColor: '#000FFF',
        flexDirection: 'column',
        alignItems: 'stretch',
        alignSelf: 'stretch'
    },
    formTextInput: {
        alignSelf: 'stretch'
    }
});

module.exports = PantsForm;

/*
 render() {
 return (
 <Button
 style={{fontSize: 20, color: 'green'}}
 styleDisabled={{color: 'red'}}
 onPress={this._handlePress}
 >
 Press Me!
 </Button>
 );
 },

 _handlePress(event) {
 console.log('Pressed!');
 },

 */
