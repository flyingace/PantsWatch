import React from 'react';
import PropTypes from 'prop-types';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';
import PantsThumb from '../../assets/PantsThumb.png';

class Pane extends React.Component {

    getDefaultProps() {
        return {
            onPress: this._onPress,
            paneLabel: 'Pants Pane',
            imageURL: { PantsThumb }
        };
    }

    getInitialState() {
        return null;
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    _onPress() {
        console.log('pane pressed');
    }

    render() {
        return (
            <TouchableOpacity onPress={ this.props.onPress } style={ styles.wrapper }>
                <Image source={ this.props.imageURL } resizeMode={ Image.resizeMode.cover } style={ this.props.paneStyle }/>
                <Text style={ styles.label }>{this.props.paneLabel}</Text>
            </TouchableOpacity>
        );
    }
}

Pane.propTypes = {};

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