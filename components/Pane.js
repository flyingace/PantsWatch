const React = require('react-native');
const {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    } = React;

const Pane = React.createClass({

    displayName: 'Pane',

    propTypes: {},

    getDefaultProps: function () {
        return {
            onPress: this._onPress,
            paneLabel: 'Pants Pane',
            imageURL: require('../assets/PantsThumb.png')
        };
    },

    getInitialState: function () {
        return null;
    },

    componentDidMount: function () {
    },

    componentWillUnmount: function () {
    },

    _onPress: function () {
        console.log('pane pressed')
    },

    render: function () {
        return (
                <TouchableOpacity onPress={this.props.onPress} style={styles.wrapper}>
                    <Image source={this.props.imageURL} />
                    <Text style={styles.label}>{this.props.paneLabel}</Text>
                </TouchableOpacity>
        );
    }
});

var styles = StyleSheet.create(
    {
        wrapper: {
            alignItems: 'center'
        },
        label: {
            fontFamily: 'HappyFox-Condensed',
            fontSize: 18,
            textAlign: 'right'
        },
        title: {

        }
    }
)

module.exports = Pane;