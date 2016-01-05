const React = require('react-native');
const {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Navigator
    } = React;
const RouterConfig = require('../RouterConfig/RouterConfig');
const SideMenu = require('react-native-side-menu');
const Menu = require('../Menu/Menu');
const Button = require('../Button/Button');
const PantsListView = require('../PantsListView/PantsListView');
const PantsForm = require('../PantsForm/PantsForm');

const Application = React.createClass({

    displayName: 'Application',

    propTypes: {},

    getDefaultProps: function () {
    },

    getInitialState: function () {
        return {
            isOpen: false
        }
    },

    componentDidMount: function () {
    },

    componentWillUnmount: function () {
    },

    toggle: function () {
        this.setState({
            isOpen: !this.state.isOpen
        });
    },

    updateMenuState: function (isOpen) {
        this.setState({isOpen});
    },

    closeMenu: function () {
        this.setState({isOpen: false});
    },

    render: function () {

        const navigator = Navigator.navigator;
        return (
            <SideMenu
                menu={<Menu onItemPress={this.toggle} />}
                isOpen={this.state.isOpen}
                onChange={(isOpen) => this.updateMenuState(isOpen)}>
                <RouterConfig />
                <Button style={styles.button} onButtonPress={this.toggle}>
                    <Image
                        source={{ uri: 'http://i.imgur.com/vKRaKDX.png', width: 32, height: 32, }}/>
                </Button>
            </SideMenu>
        );
    }
});

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        top: 20,
        padding: 10,
    },
    caption: {
        fontSize: 20,
        fontWeight: 'bold',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

module.exports = Application;