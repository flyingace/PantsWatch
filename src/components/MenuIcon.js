import React from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet
} from 'react-native';

import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from '../config.json';

const Icon = createIconSetFromFontello(fontelloConfig);

export const MenuIcon = (props) => {
    const iconStyle = { marginLeft: 15, marginRight: 10, color: 'black' };

    return (
        <Icon name={'menu'} size={30} style={iconStyle} onPress={() => props.navigation.navigate('DrawerOpen')}/>
    )
};