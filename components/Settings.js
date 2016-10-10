const React = require('react');
const {
    Text,
    View
    } = require('react-native');

const Settings = React.createClass({

    displayName: 'Settings',

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
            <View>
                <Text>Settings</Text>
            </View>
        );
    }
});

module.exports = Settings;