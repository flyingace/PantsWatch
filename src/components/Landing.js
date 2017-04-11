import React from 'react';
import {Image, LayoutAnimation, StyleSheet, Text, View} from 'react-native';
import Dimensions from 'Dimensions';
import Pane from './Pane';
import PantsListPage from '../containers/PantsListPage';
import PantsForm from './PantsForm';
import Patches from './Patches';
import Settings from './Settings';

import landingBanner from '../../assets/banners/landing_banner.png';
import scribblePrompt from '../../assets/scribblePrompt.png';
import seePantsImg from '../../assets/landing/see_pants.png';
import addPantsImg from '../../assets/landing/add_pants.png';
import alterPantsImg from '../../assets/landing/alter_pants.png';
import washPantsImg from '../../assets/landing/wash_pants.png';
import patchesImg from '../../assets/landing/patches.png';
import settingsImg from '../../assets/landing/settings.png';

const windowDims = Dimensions.get('window');
const windowHeight = windowDims.height;
const windowWidth = windowDims.width;
const windowIsTall = windowDims.height > 500;

const bannerHeight = 85;
const contentHeight = windowHeight - bannerHeight;
const promptHeight = Math.round(contentHeight * .18);
const gridHeight = contentHeight - promptHeight;

const Landing = React.createClass({

    displayName: 'Landing',

    propTypes: {},

    getDefaultProps() {
    },

    getInitialState() {
        return {
            questionText: 'What Pants Are You Going\nTo Wear Today?',
            menu: 'hidden'
        }
    },

    componentWillUnmount() {
    },

    onPanePress(itemName) {
        const nav = this.props.navigator;

        console.log(itemName);
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        console.disableYellowBox = true;

        switch (itemName) {
            case 'landing':
                nav.push({component: Landing, name: 'Home'});
                break;
            case 'choosePants':
                nav.replace({component: PantsListPage, name: 'Choose Pants'});
                break;
            case 'addPants':
                nav.replace({component: PantsForm, name: 'Add Pants'});
                break;
            case 'editPants':
                nav.replace({component: PantsForm, name: 'Edit Pants'});
                break;
            case 'washPants':
                nav.replace({component: PantsListPage, name: 'Wash Pants'});
                break;
            case 'patches':
                nav.replace({component: Patches, name: 'Wash Pants'});
                break;
            case 'appSettings':
                nav.replace({component: Settings, name: 'Wash Pants'});
                break;
            default:
                nav.replace({component: Landing, name: 'Home'});
                break;
        }
    },

    render() {
        let landingStyles = (windowIsTall) ? tallStyles : shortStyles;
        let paneStyle = (windowIsTall) ? tallPaneStyle : shortPaneStyle;
        console.log(windowHeight);
        console.log(gridHeight);
        console.log(paneStyle);
        console.log(paneStyle.pane);

        return (
            <View style={commonStyles.container}>
                <View style={commonStyles.banner}>
                    <Image source={landingBanner}/>
                </View>
                <Image style={commonStyles.scribblePrompt} source={scribblePrompt} resizeMode={'contain'}/>
                <View style={landingStyles.panels}>
                    <Pane paneLabel="See Your Pants" imageURL={seePantsImg} paneStyle={paneStyle.pane}
                          onPress={() => this.onPanePress('choosePants')}/>
                    <Pane paneLabel="Add Some Pants" imageURL={addPantsImg} paneStyle={paneStyle.pane}
                          onPress={() => this.onPanePress('addPants')}/>
                    <Pane paneLabel="Alter Your Pants" imageURL={alterPantsImg} paneStyle={paneStyle.pane}
                        /* onPress={() => this.onPanePress('editPants')} */
                    />
                    <Pane paneLabel="Wash Your Pants" imageURL={washPantsImg} paneStyle={paneStyle.pane}
                        /* onPress={() => this.onPanePress('washPants')} */
                    />
                    <Pane paneLabel="Patches" imageURL={patchesImg} paneStyle={paneStyle.pane}
                        /* onPress={() => this.onPanePress('patches')} */
                    />
                    <Pane paneLabel="Settings" imageURL={settingsImg} paneStyle={paneStyle.pane}
                        /* onPress={() => this.onPanePress('appSettings')} */
                    />
                </View>
            </View>
        );
    }
});

const commonStyles = StyleSheet.create(
    {
        container: {
            width: windowWidth,
            height: windowHeight,
            backgroundColor: '#15A8E0',
            flexDirection: 'column',
            alignItems: 'flex-start',
            alignSelf: 'flex-start',
            justifyContent: 'flex-start'
        },
        banner: {
            width: windowWidth,
            height: 85,
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 5
        },
        scribblePrompt: {
            height: promptHeight,
            width: windowWidth
        }
    }
);

const tallStyles = StyleSheet.create(
    {
        panels: {
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            alignItems: 'flex-start',
            width: windowWidth,
            borderBottomColor: '#000000',
            paddingTop: 8,
            paddingLeft: 12,
            paddingRight: 12
        }
    }
);

const shortStyles = StyleSheet.create(
    {
        panels: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            width: windowWidth,
            paddingTop: 8,
            paddingLeft: 12,
            paddingRight: 12,
            alignSelf: 'flex-end',
            justifyContent: 'space-around'
        }
    }
);

const tallPaneStyle = StyleSheet.create(
    {
        pane: {
            width: gridHeight * .27,
            height: gridHeight * .27
        }
    }
);

const shortPaneStyle = StyleSheet.create(
    {
        pane: {
            width: windowWidth * .3,
            height: windowWidth * .3,
            marginTop: 15
        }
    }
);

module.exports = Landing;
