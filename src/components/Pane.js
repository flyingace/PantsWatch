import React from 'react';
import {
    Image,
    PropTypes,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Dimensions from 'Dimensions';
import PantsThumb from '../../assets/PantsThumb.png';

const windowDims = Dimensions.get('window');

const Pane = React.createClass({

    displayName: 'Pane',

    propTypes: {
        // paneStyle: React.PropTypes.object
    },

    getDefaultProps() {
        return {
            onPress: this._onPress,
            paneLabel: 'Pants Pane',
            imageURL: { PantsThumb }
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
        console.log('pane pressed');
    },

    render() {
        return (
            <TouchableOpacity onPress={ this.props.onPress } style={ styles.wrapper }>
                <Image source={ this.props.imageURL } resizeMode={ Image.resizeMode.cover } style={ this.props.paneStyle }/>
                <Text style={ styles.label }>{this.props.paneLabel}</Text>
            </TouchableOpacity>
        );
    }
});

const styles = StyleSheet.create(
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
        title: {}
    }
);

module.exports = Pane;