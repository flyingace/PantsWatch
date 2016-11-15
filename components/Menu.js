import React from 'react';
import Dimensions from 'Dimensions';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    LayoutAnimation
} from 'react-native';
import Landing from './Landing';
import PantsListView from './PantsListView';
import PantsForm from './PantsForm';
import Patches from './Patches';
import Settings from './Settings';

const window = Dimensions.get('window');
const panelWidth = window.width * .5;

const Menu = React.createClass({

    displayName: 'Menu',

    propTypes: {},

    getDefaultProps() {
    },

    getInitialState() {
        return {
            left: panelWidth * -1,
            menu: 'hidden'
        }
    },

    componentDidMount() {
    },

    componentWillUnmount() {
    },

    showMenu() {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({left: 0, menu: 'shown', overlayWidth: window.width})

    },

    hideMenu() {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({left: panelWidth * -1, menu: 'hidden', overlayWidth: 0})
    },

    toggleMenu() {
        if (this.state.menu === 'shown') {
            this.hideMenu();
        } else {
            this.showMenu();
        }
    },


    //TODO: Make this its own component?
    onMenuItemPress(itemName) {
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
                //nav.replace({component: PantsForm, name: 'Edit Pants'});
                break;
            case 'washPants':
                //nav.replace({component: PantsListView, name: 'Wash Pants'});
                break;
            case 'patches':
                //nav.replace({component: Patches, name: 'Wash Pants'});
                break;
            case 'appSettings':
                //nav.replace({component: Settings, name: 'Wash Pants'});
                break;
            default:
                nav.replace({component: Landing, name: 'Home'});
                break;
        }

        this.hideMenu();
    },

    render() {

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
        backgroundColor: '#ffffcc',
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