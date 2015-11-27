/*globals */

const React = require('react-native');
const { Image, Text, StyleSheet, View } = React;

const Landing = React.createClass({

    displayName: 'Landing',

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
            <View style={styles.bitches}>
                <Text style={styles.bitchesText}>
                    Pants Watch.
                </Text>
                <Image source={require('../../assets/landing-pants.png')} style={styles.landingPants}/>
                <Text style={styles.bitchesText}>
                    Get you some.
                </Text>
            </View>
        );
    }
});

var styles = StyleSheet.create(
    {
        bitches: {
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1
        },
        bitchesText: {
            fontFamily: 'HelveticaNeue-CondensedBold',
            fontSize: 24
        },
        landingPants: {
            width: 243,
            height: 153,
            margin: 15
        }
    }
);

module.exports = Landing;