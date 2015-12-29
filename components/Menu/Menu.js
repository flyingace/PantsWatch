const React = require('react-native');
const Dimensions = require('Dimensions');
const {
    ScrollView,
    StyleSheet,
    Text,
    View
    } = React;

import {Actions} from 'react-native-router-flux'


const Button = require('../Button/Button');
const window = Dimensions.get('window');

const Menu = React.createClass({

    displayName: 'Menu',

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
            <ScrollView style={styles.menu}>
                <Text style={styles.item} onPress={Actions.choosePants}>Choose Pants</Text>
                <Text style={styles.item} onPress={Actions.addPants}>Add Pants</Text>
                <Text style={styles.item} onPress={Actions.editPants}>Edit Pants</Text>
                <Text style={styles.item} onPress={Actions.washPants}>Wash Pants</Text>
                <Text style={styles.item} onPress={Actions.patches}>Patches</Text>
                <Text style={styles.item} onPress={Actions.appSettings}>Settings</Text>
            </ScrollView>
        );
    }
});

const styles = StyleSheet.create({
    menu: {
        flex: 1,
        width: window.width,
        height: window.height,
        backgroundColor: 'gray',
        padding: 20,
    },
    avatarContainer: {
        marginBottom: 20,
        marginTop: 20,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        flex: 1,
    },
    name: {
        position: 'absolute',
        left: 70,
        top: 20,
    },
    item: {
        fontSize: 14,
        fontWeight: '300',
        paddingTop: 5,
    },
});


module.exports = Menu;