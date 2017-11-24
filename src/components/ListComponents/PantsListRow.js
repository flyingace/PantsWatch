import React from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    View
} from 'react-native';
import { RowThumb, RowTitle, RowAttribute, RowBadge } from './RowComponents';

const defaultPantsImgSrc = '../../assets/pants01.png';

//TODO: Convert this to a Stateless Functional Component

class PantsListRow extends React.Component {

    static propTypes = {
        pantsName: PropTypes.string,
        pantsColor: PropTypes.string,
        pantsColorHex: PropTypes.string,
        pantsBrand: PropTypes.string,
        pantsStyle: PropTypes.string,
        pantsWearLimit: PropTypes.number,
        pantsImgSrc: PropTypes.object,
        selected: PropTypes.bool
    };

    static defaultProps = {
        pantsName: 'Favorite Pants',
        pantsColor: 'Blue',
        pantsColorHex: '#0000FF',
        pantsBrand: 'Levi\'s',
        pantsStyle: 'Casual',
        pantsWearLimit: 9,
        pantsImgSrc: { defaultPantsImgSrc },
        selected: false
    };

    render() {
        // const rowStyle = (this.props.selected) ? rowStyles.selectedRow : rowStyles.pantsRow;
        return (
            <View style={rowStyles.pantsRow}>
                <RowThumb thumbSrc={this.props.pantsImgSrc}/>
                <View style={rowStyles.detailColumn}>
                    <View style={rowStyles.topDetailRow}>
                        <RowTitle name={this.props.pantsName}/>
                        <RowBadge wearCount={this.props.pantsWearCount} wearLimit={this.props.pantsWearLimit}/>
                    </View>
                    <View style={rowStyles.bottomDetailRow}>
                        <RowAttribute icon={'color_pallette'} label={this.props.pantsColor}
                                      colorValue={this.props.pantsColorHex}/>
                        <RowAttribute icon={'brand'} label={this.props.pantsBrand}/>
                        <RowAttribute icon={'style'} label={this.props.pantsStyle}/>
                    </View>
                </View>
            </View>
        )
    };
}


const rowStyles = StyleSheet.create({
    pantsRow: {
        flex: 1,
        flexDirection: 'row',
        height: 80,
        marginBottom: 2,
        backgroundColor: 'white'
    },
    selectedRow: {
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
        paddingLeft: 5,
    },
    topDetailRow: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    bottomDetailRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 5
    }
});

module.exports = PantsListRow;
