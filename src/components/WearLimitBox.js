import React from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

const wearLimitBox = React.createClass({

    displayName: 'WearLimitBox',

    propTypes: {},

    getDefaultProps() {
        return {
            pantsWearCount: 0,
            pantsWearLimit: 6
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
        return (
            <View style={pantsWearLimitStyles.pantsWearLimitBox}>
                <Text style={pantsWearLimitStyles.countText}>{this.props.pantsWearCount}/{this.props.pantsWearLimit}</Text>
            </View>
        );
    }
});

const pantsWearLimitStyles = StyleSheet.create({
    pantsWearLimitBox: {
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


module.exports = wearLimitBox;