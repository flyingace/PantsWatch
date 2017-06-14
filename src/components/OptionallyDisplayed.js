import React from 'react';
import { View } from 'react-native';

const OptionallyDisplayed = React.createClass({
    propTypes: {
        display: React.PropTypes.bool.isRequired
    },

    render() {
        return (this.props.display === true) ? <View>{this.props.children}</View> : null;
    }
});

module.exports = OptionallyDisplayed;

