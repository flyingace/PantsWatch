import React from 'react';
import PropTypes from 'prop-types';

import {Button, ButtonGroup} from 'react-native-elements';

const buttons = ['Wear', 'Wash', 'Edit', 'Delete'];

class ActionBar extends React.Component {

    static propTypes = {};

    static defaultProps = {};

    updateIndex = (selectedIndex) => {
        console.log(selectedIndex);
        // this.setState({selectedIndex})
    };

    render () {

        return (
            <ButtonGroup
                onPress={(e) => {this.updateIndex(e)}}
                buttons={buttons}
                containerStyle={{height: 40}} />
        )
    }
}

module.exports = ActionBar;