const React = require('react');
const Dimensions = require('Dimensions');
const {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    LayoutAnimation
    } = require('react-native');
const Landing = require('./Landing');
const PantsListView = require('./PantsListView');
const PantsForm = require('./PantsForm');
const Patches = require('./Patches');
const Settings = require('./Settings');
const Button = require('./Button');

const window = Dimensions.get('window');
const panelWidth = window.width * .5;

const Menu = React.createClass({

    displayName: 'Menu',

    propTypes: {},

    getDefaultProps: function () {
    },

    getInitialState: function () {
        return {
            left: panelWidth * -1,
            menu: 'hidden'
        }
    },

    componentDidMount: function () {
    },

    componentWillUnmount: function () {
    },

    showMenu: function () {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({left: 0, menu: 'shown', overlayWidth: window.width})

    },

    hideMenu: function () {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({left: panelWidth * -1, menu: 'hidden', overlayWidth: 0})
    },

    toggleMenu: function () {
        if (this.state.menu === 'shown') {
            this.hideMenu();
        } else {
            this.showMenu();
        }
    },


    //TODO: Make this its own component?
    onMenuItemPress: function (itemName) {
        const nav = this.props.navigator;

        console.log(itemName);
        switch (itemName) {
            case 'landing':
                nav.replace({component: Landing, name: 'Home'});
                break;
            case 'choosePants':
                nav.replace({component: PantsListView, name: 'Choose Pants'});
                break;
            case 'addPants':
                nav.replace({component: PantsForm, name: 'Add Pants'});
                break;
            case 'editPants':
                nav.replace({component: PantsForm, name: 'Edit Pants'});
                break;
            case 'washPants':
                nav.replace({component: PantsListView, name: 'Wash Pants'});
                break;
            case 'patches':
                nav.replace({component: Patches, name: 'Wash Pants'});
                break;
            case 'appSettings':
                nav.replace({component: Settings, name: 'Wash Pants'});
                break;
            default:
                nav.replace({component: Landing, name: 'Home'});
                break;
        }

        this.hideMenu();
    },

    render: function () {

        return (<View style={[styles.wrapper, {left: this.state.left}]}>
                <ScrollView style={styles.menu}>
                    <Text style={styles.item} onPress={() => this.onMenuItemPress('landing')}>Home</Text>
                    <Text style={styles.item} onPress={() => this.onMenuItemPress('choosePants')}>Choose Pants</Text>
                    <Text style={styles.item} onPress={() => this.onMenuItemPress('addPants')}>Add Pants</Text>
                    <Text style={styles.item} onPress={() => this.onMenuItemPress('editPants')}>Edit Pants</Text>
                    <Text style={styles.item} onPress={() => this.onMenuItemPress('washPants')}>Wash Pants</Text>
                    <Text style={styles.item} onPress={() => this.onMenuItemPress('patches')}>Patches</Text>
                    <Text style={styles.item} onPress={() => this.onMenuItemPress('appSettings')}>Settings</Text>
                </ScrollView>
                <TouchableOpacity onPress={this.toggleMenu}>
                    <View style={[styles.overlay, {width: this.state.overlayWidth}]}/>
                    <Image source={require('../assets/menu_tab.png')} style={styles.labelButton}/>
                </TouchableOpacity>
            </View>
        );
    }
});

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        flexDirection: 'row',
        position: 'absolute',
        top: 0,
        left: 0,
        height: window.height,
        backgroundColor: 'rgba(255,255,255,0)'
    },
    menu: {
        width: panelWidth,
<<<<<<< HEAD
        backgroundColor: '#ffffcc',
=======
        backgroundColor: 'lightblue',
>>>>>>> b81af6e72ecb74b31252d754467a7d8404d71e71
        padding: 20
    },
    item: {
        fontFamily: 'HappyFox-Condensed',
        fontSize: 30,
        color: '#000000',
        paddingTop: 5
    },
    labelButton: {
        width: 30,
        height: 75,
        marginTop: 20
    },
    overlay: {
        position: 'absolute',
        top: 0,
        height: window.height,
        backgroundColor: 'rgba(0,0,0,0)'
    }
});


module.exports = Menu;