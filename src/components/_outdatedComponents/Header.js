import React from 'react';
import PropTypes from 'prop-types';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import menuButton from '../../../assets/menu.png';

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
        const navigate = this.props.navigate;

        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.menuButton}
                    onPress={() => navigate('DrawerOpen')}>
                    <Image source={menuButton}/>
                </TouchableOpacity>
                <Text style={styles.pageTitle}>{this.props.pageTitle}</Text>
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
        maxHeight: 50,
        backgroundColor: 'rgba(255,255,255,.8)',
        borderBottomColor: 'black',
        borderBottomWidth: 2
    },
    menuButton: {
        flex: 0,
        padding: 10
    },
    pageTitle: {
        fontFamily: 'HappyFox-Condensed',
        fontSize: 30,
        color: 'black',
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
    placeHolder: {
        flex: 1,
        padding: 10,
        opacity: 0,
        height: 30,
        width: 30
    }
});