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

    onMenuItemPress: function (itemName) {
        console.log(itemName);
        this.props.onItemPress();
        Actions[itemName]();
    },

    render: function () {

        return (
            <ScrollView style={styles.menu}>
                <Text style={styles.item} onPress={() => this.onMenuItemPress('landing')}>Home</Text>
                <Text style={styles.item} onPress={() => this.onMenuItemPress('choosePants')}>Choose Pants</Text>
                <Text style={styles.item} onPress={() => this.onMenuItemPress('addPants')}>Add Pants</Text>
                <Text style={styles.item} onPress={() => this.onMenuItemPress('editPants')}>Edit Pants</Text>
                <Text style={styles.item} onPress={() => this.onMenuItemPress('washPants')}>Wash Pants</Text>
                <Text style={styles.item} onPress={() => this.onMenuItemPress('patches')}>Patches</Text>
                <Text style={styles.item} onPress={() => this.onMenuItemPress('appSettings')}>Settings</Text>
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