import React from 'react';
import {
    Button,
    ScrollView,
    StyleSheet,
    Slider,
    Text,
    View,
    Image
} from 'react-native';
import _ from 'lodash';
import DB from '../../db.js';
import { DBEvents } from 'react-native-db-models';
import FormTextInput from './FormTextInput';
import FormPicker from './FormPicker';
import FormSlider from './FormSlider';
import PantsListView from './PantsListView';
import FormStyles from '../styles/FormStyles';
import BackgroundImage from '../../assets/backgrounds/redPlaid.png';
import PageTitle from '../../assets/page_titles/addFormTitle.png';

/*
 const Form = t.form.Form;

 const AddPants = t.struct({
 pantsName: t.String,
 pantsColor: t.maybe(t.String),
 pantsStyle: t.maybe(t.String),
 pantsBrand: t.maybe(t.String),
 pantsWearLimit: t.Number
 });

 const UpdatePants = t.struct({
 _id: t.Number,
 selected: t.Boolean,
 pantsName: t.String,
 pantsColor: t.maybe(t.String),
 pantsStyle: t.maybe(t.String),
 pantsBrand: t.maybe(t.String),
 pantsWearCount: t.Number,
 pantsWearLimit: t.Number,
 lastWornDate: t.maybe(t.String)
 });

 const options = {
 stylesheet: FormStyles,
 // auto: 'placeholders',
 autoCapitalize: true,
 fields: {
 _id: {
 hidden: true
 },
 selected: {
 hidden: true
 },
 pantsName: {
 label: 'Name:'
 },
 pantsColor: {
 label: 'Color:'
 },
 pantsStyle: {
 label: 'Style:'
 },
 pantsBrand: {
 label: 'Brand:'
 },
 pantsWearCount: {
 label: 'Wear Count:'
 },
 pantsWearLimit: {
 label: 'Wear Limit:'
 },
 lastWornDate: {
 label: 'Last Worn On:'
 }

 }
 };
 */

const PantsForm = React.createClass({

    propTypes: {
        pantsData: React.PropTypes.object,
        retrievePantsData: React.PropTypes.func,
        validateForm: React.PropTypes.func,
        submitForm: React.PropTypes.func
    },

    getDefaultProps () {
        return {
            pantsImg: null,
            pantsName: null,
            pantsColor: null,
            pantsStyle: null,
            pantsBrand: null,
            pantsWearCount: 0,
            pantsWearLimit: null
        };
    },

    getInitialState () {
        return {
            value: {}
        };
    },

    componentWillMount() {
        if (this.props.route.updateId) {
            this.props.retrievePantsData(this.props.route.updateId);
        }
    },

    componentWillReceiveProps(nextProps) {
        // if (nextProps.pantsData.formData.value) {
        //     this.setState({ 'value': nextProps.pantsData.formData.value });
        // }
    },

    renderForm () {
        if (!this.props.route.updateId) {
            return (
                <View ref="addPantsForm">
                    <FormTextInput labelText="Pants Name"
                                   required={true}
                                   validation="Please enter a name for your pants"
                                   fieldName="pantsName"
                                   inputRef="nameInput"
                                   addPantsName={this.props.addPantsName}/>
                    <FormPicker labelText="Pants Color"
                                fieldName="pantsColor"
                                inputRef="colorPicker"
                                addPantsColor={this.props.addPantsColor}/>
                    {/*<FormTextInput labelText="Pants Brand"/>*/}
                    {/*<FormTextInput labelText="Pants Style"/>*/}
                    {/*<FormSlider labelText="Wear Limit"/>*/}
                </View>
            );
        } else {
            return (
                <View ref="updatePantsForm">
                    <FormTextInput labelText="Pants Name"
                                   required={true}
                                   validation="Please enter a name for your pants"
                                   value={this.props.pantsData.formData.value.pantsName}/>
                    <FormSlider labelText="Wear Limit" value={this.props.pantsData.formData.value.pantsWearLimit}/>
                </View>
            );
        }
    },

    onFormSubmit () {

        //First Step Should Be To Validate
        //Then if validated, to update the database
        //And then to go to the pants list page

        // call getValue() to get the values of the form
        let formData;
        if (!this.props.route.updateId) {
            formData = this.state;
            console.log(formData);
            if (formData) {
                this.addPantsToDB(formData);
            }
        } else {
            formData = this.refs.updatePantsForm.getValue();
            if (formData) {
                this.updatePantsInDB(formData);
            }
        }
    },

    addPantsToDB (formData) {
        this.props.addPantsData(formData);
        this.resetForm();
        this.navigateToPantsList();
    },

    updatePantsInDB (formData) {
        this.props.updatePantsData(formData);
        // this.resetForm();
        // this.navigateToPantsList();
    },

    resetForm () {
        this.setState({ value: null });
    },

    navigateToPantsList () {
        //TODO: Add check to see if "add multiple pairs of pants" is checked and
        //if yes, do not navigate away but reset focus to first field.
        this.props.navigator.replace({ component: PantsListView, name: 'Choose Pants' });
    },

    render () {

        return (
            <View>
                <Image source={BackgroundImage} style={styles.backgroundImage}/>
                <ScrollView contentContainerStyle={ styles.formWrapper } style={ styles.transparent }>
                    <Image source={PageTitle} style={styles.pageTitle} resizeMode={'contain'}/>
                    {this.renderForm()}
                    <Button
                        onPress={this.onFormSubmit}
                        title="Submit My Pants"
                        color="#66d8ff"
                        accessibilityLabel="Add your pants to the database"
                    />
                </ScrollView>
            </View>
        );
    }
});

const styles = StyleSheet.create({
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