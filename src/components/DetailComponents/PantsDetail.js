import React from 'react';
import PropTypes from 'prop-types';
import {
    ScrollView,
    StyleSheet,
    View
} from 'react-native';
import { DetailTile, DetailAttribute } from './DetailComponents';
import FloatingActionButton from '../FloatingActionButton';

//TODO: Convert this to a Stateless Functional Component

class PantsDetail extends React.Component {

    static propTypes = {
    };

    static defaultProps = {
    };

    state = {
    };

    render () {
        const { pantsName, pantsColor, pantsBrand, pantsStyle, pantsWearCount, pantsWearLimit, lastWornDate, selected, _id } = this.props.navigation.state.params;
        return (
            <View style={detailStyles.pantsDetail}>
                    <View style={detailStyles.topDetailRow}>
                        <DetailTile name={pantsName}/>
                        <FloatingActionButton {...this.props} pantsId={_id}/>
                    </View>
                    <ScrollView style={detailStyles.bottomDetailRow}>
                        <DetailAttribute label={'Color'} icon={'color_pallette'} value={pantsColor}/>
                        <DetailAttribute label={'Brand'} icon={'brand'} value={pantsBrand}/>
                        <DetailAttribute label={'Style'} icon={'style'} value={pantsStyle}/>
                        <DetailAttribute label={'Wear Count'} icon={'count'} value={pantsWearCount} limit={pantsWearLimit}/>
                        <DetailAttribute label={'Wear Limit'} icon={'limit'} value={pantsWearLimit}/>
                        <DetailAttribute label={'Last Worn'} icon={'calendar'} value={lastWornDate}/>
                    </ScrollView>
            </View>
        );
    }
}

const detailStyles = StyleSheet.create({
    pantsDetail: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'lightgrey'
    },
    selectedDetail: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'rgba(255,255,255,.85)',
        borderTopColor: '#EEEEEE',
        borderTopWidth: 1,
        height: 76,
        padding: 3,
        overflow: 'hidden',
    },
    detailColumn: {
        flex: 1,
        flexDirection: 'column',
    },
    topDetailRow: {
        flex: 0,
        flexDirection: 'row',
        paddingBottom: 7
    },
    bottomDetailRow: {
        flex: 1,
        flexDirection: 'column'

    }
});
module.exports = PantsDetail;