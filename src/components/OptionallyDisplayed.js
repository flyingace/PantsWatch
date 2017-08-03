import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';


class OptionallyDisplayed extends React.Component {

    render() {
        return (this.props.display === true) ? <View>{this.props.children}</View> : null;
    }
}

OptionallyDisplayed.propTypes = {
    display: PropTypes.bool.isRequired
};

module.exports = OptionallyDisplayed;

