import React from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

const MaxWearsBox = React.createClass({

    displayName: 'MaxWearsBox',

    propTypes: {},

    getDefaultProps() {
        return {
            wearsCount: 33,
            maxWears: 6
        }
    },

    getInitialState() {
        return null;
    },

    componentDidMount() {
    },

    componentWillUnmount() {
    },

    render() {
        let maxWears = this.props.maxWears.toString();
        return (
            <View style={maxWearsStyles.maxWearsBox}>
                <Text style={maxWearsStyles.countText}>{this.props.wearsCount}/{maxWears}</Text>
            </View>
        );
    }
});

const maxWearsStyles = StyleSheet.create({
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