import React from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

class wearLimitBox extends React.Component {


    render() {
        return (
            <View style={ pantsWearLimitStyles.pantsWearLimitBox }>
                <Text style={ pantsWearLimitStyles.countText }>{this.props.pantsWearCount}/{this.props.pantsWearLimit}</Text>
            </View>
        );
    }
}

wearLimitBox.propTypes = {};

wearLimitBox.defaultProps = {
    pantsWearCount: 0,
    pantsWearLimit: 6
};

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