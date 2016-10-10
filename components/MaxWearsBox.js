const React = require('react');
const {
    StyleSheet,
    Text,
    View
    } = require('react-native');

const MaxWearsBox = React.createClass({

    displayName: 'MaxWearsBox',

    propTypes: {},

    getDefaultProps: function () {
        return {
            wearsCount: 33,
            maxWears: 66
        }
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
            <View style={maxWearsStyles.maxWearsBox}>
                <Text style={maxWearsStyles.countText}>{this.props.wearsCount}/{this.props.maxWears}</Text>
            </View>
        );
    }
});

var maxWearsStyles = StyleSheet.create({
    maxWearsBox: {
        width: 58,
        borderColor: '#008800',
        borderWidth: 4,
        paddingHorizontal: 4,
        paddingVertical: 0,
        borderTopLeftRadius: 5,
        borderBottomRightRadius: 5,
        borderTopRightRadius: 2,
        borderBottomLeftRadius: 2
    },
    countText: {
        fontFamily: 'HappyFox-Condensed',
        fontSize: 24,
        textAlign: 'center'
    }
});


module.exports = MaxWearsBox;