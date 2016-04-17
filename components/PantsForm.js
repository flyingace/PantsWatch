import React, {
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';
import t from 'tcomb-form-native';
import {forEach} from 'lodash';
import Button from './Button';
import FormText from './FormTextInput';
import PantsListView from './PantsListView';
import realm from './realm.js';
import PantsWatchStyles from '../PantsWatchStyles.js';
import BackgroundImage from '../assets/backgrounds/redPlaid.png';
import PageTitle from '../assets/page_titles/addFormTitle.png';

const windowDims = Dimensions.get('window');
const titleHeight = 125;


//TODO: I'm not sure that using state here to hold and pass the form values is really
//the best way to go about doing this. Would it be better to just use a regular object {} ?


const PantsForm = React.createClass({

    propTypes: {
        pantsData: React.PropTypes.object
    },

    getDefaultProps() {
        return {
            pantsImg: null,
            pantsName: null,
            pantsColor: null,
            pantsStyle: null,
            pantsBrand: null,
            pantsWearLimit: null
        }
    },

    getInitialState() {
        return {
            pantsImg: this.props.pantsImg,
            pantsName: this.props.pantsName,
            pantsColor: this.props.pantsColor,
            pantsStyle: this.props.pantsStyle,
            pantsBrand: this.props.pantsBrand,
            pantsWearLimit: this.props.pantsWearLimit
        };
    },

    componentDidMount() {
    },

    submitFormData() {
        let {pantImg, pantsName, pantsColor, pantsStyle, pantsBrand, pantsWearLimit} = this.state;
        let value = {};
        const self = this;

        //TODO: add step for validation

        //TODO: break out submission into separate function
        realm.write(() => {
            realm.create('Pants', {
                pantsImg: pantImg,
                pantsName: pantsName,
                pantsColor: pantsColor,
                pantsBrand: pantsBrand,
                pantsStyle: pantsStyle,
                pantsWearLimit: pantsWearLimit,
                pantLastWornDate: value.lastWornDate,
                addedOn: value.addedOnDate
            })
        });
        /*
         This is the old callback.
         Could this be attached to a listener that notes when the form data has been successfully been submitted?
         OR do I just add these as part of the
         function (updatedTable) {
         self.resetForm();
         self.navigateToPantsList();
         console.log(updatedTable);
         }
         */
    },

    resetForm() {
        //this can be done with t.comb
        let stateObject = this.state;
        const self = this;
        forEach(stateObject, function (n, key) {
            self.setState({key: null});
        })
    },

    navigateToPantsList() {
        //TODO: Add check to see if "add multiple pairs of pants" is checked and
        //if yes, do not navigate away but reset focus to first field.
        //TODO: Add Flux architecture to handle updating the navigator, no?
        this.props.navigator.replace({component: PantsListView, name: 'Choose Pants'});
    },

    render() {
        //not sure about this var, using state?
        const Form = t.form.Form;
        let {pantsName, pantsColor, pantsStyle, pantsBrand, pantsWearLimit} = this.state;
        const addPantsForm = t.struct({
            pantsName: t.String,
            pantsColor: t.String,
            pantsStyle: t.String,
            pantsBrand: t.String,
            wearLimit: t.Number,
            dateAdded: t.Date,
            lastWorn: t.Date
        });

        let addPantsOptions = {};

        return (
            <View>
                <Image source={BackgroundImage} style={styles.backgroundImage}/>
                <Image source={PageTitle} style={styles.pageTitle} resizeMode={'contain'}/>
                <View style={{height: windowDims.height - titleHeight}}>
                    <ScrollView contentContainerStyle={ styles.formWrapper } style={ styles.transparent }
                                keyboardShouldPersistTaps={true}>
                        <Text style={styles.formTitle}>Add Some Pants</Text>

                        <Form ref='addPantsForm'
                              type={addPantsForm}
                              options={addPantsOptions}
                        />
                        <Button buttonText="Submit My Pants" onButtonPress={this.submitFormData}/>
                    </ScrollView>
                </View>
            </View>
        );
    }
});

var styles = StyleSheet.create({
    transparent: {
        backgroundColor: 'rgba(0,0,0,0)'
    },
    backgroundImage: {
        flex: 1,
        position: 'absolute'
    },
    formWrapper: {
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: 'rgba(0,0,0,0)'
    },
    pageTitle: {
        marginTop: 12,
        alignSelf: 'center',
        resizeMode: 'contain',
    },
    formTitle: {
        fontFamily: 'HappyFox-Condensed',
        fontSize: 45,
        color: '#FFFFFF',
        borderBottomWidth: 1,
        borderColor: '#000000'
    }
});

module.exports = PantsForm;