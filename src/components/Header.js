import React from 'react';
import PropTypes from 'prop-types';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import menuButton from '../../assets/menu.png';

class Header extends React.Component {
    constructor() {
        super();
    };

    static propTypes = {
        pageTitle: PropTypes.string
    };

    static defaultProps = {
        pageTitle: 'Pants Watch'
    };

    state = {};

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        const navigate = this.props.navigation.navigate;

        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.menuButton}
                    onPress={() => navigate('DrawerOpen')}>
                    <Image source={menuButton}/>
                </TouchableOpacity>
                <Text style={styles.pageTitle}>{this.props.pageTitle}</Text>
                <Image source={menuButton} style={styles.placeHolder}/>
            </View>
        );
    }
}

module.exports = Header;

const styles = StyleSheet.create({
    container: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        maxHeight: 80,
        backgroundColor: 'rgba(255,255,255,.8)',
        borderBottomColor: 'black',
        borderBottomWidth: 2
    },
    menuButton: {
        flex: 1,
        padding: 10,
    },
    pageTitle: {
        fontFamily: 'HappyFox-Condensed',
        fontSize: 40,
        color: 'black',
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
    placeHolder: {
        flex: 1,
        padding: 10,
        opacity: 0
    }
});