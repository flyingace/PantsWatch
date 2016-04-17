import React, {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Dimensions from 'Dimensions';

const windowDims = Dimensions.get('window');

const Pane = React.createClass({

    displayName: 'Pane',

    propTypes: {
        paneStyle: View.propTypes.style
    },

    getDefaultProps() {
        return {
            onPress: this._onPress,
            paneLabel: 'Pants Pane',
            imageURL: require('../assets/PantsThumb.png')
        };
    },

    getInitialState() {
        return null;
    },

    componentDidMount() {
    },

    componentWillUnmount() {
    },

    _onPress() {
        console.log('pane pressed')
    },

    render() {
        return (
                <TouchableOpacity onPress={this.props.onPress} style={styles.wrapper}>
                    <Image source={this.props.imageURL} resizeMode={Image.resizeMode.cover} style={this.props.paneStyle} />
                    <Text style={styles.label}>{this.props.paneLabel}</Text>
                </TouchableOpacity>
        );
    }
});

var styles = StyleSheet.create(
    {
        wrapper: {
            marginBottom: 8
        },
        label: {
            fontFamily: 'HappyFox-Condensed',
            fontSize: 18,
            textAlign: 'center',
            alignSelf: 'center'
        },
        title: {

        }
    }
)

module.exports = Pane;