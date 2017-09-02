import React from 'react';
import PropTypes from 'prop-types';
import {
    View, Button
} from 'react-native';

class ActionBar extends React.Component {

    static propTypes = {};

    static defaultProps = {};

    state = {};

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <View>
                <Button title='Wear' onPress={(e) => {
                    console.log(e.target)
                }}>Wear</Button>
                <Button title='Wash' onPress={(e) => {
                    console.log(e.target)
                }}>Wash</Button>
                <Button title='Edit' onPress={(e) => {
                    console.log(e.target)
                }}>Edit</Button>
                <Button title='Delete' onPress={(e) => {
                    console.log(e.target)
                }}>Delete</Button>
            </View>
        );
    }
}

module.exports = ActionBar;