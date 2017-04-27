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

const COLORS = [
    { label: 'Blue', value: 'blue' },
    { label: 'Green', value: 'green' },
    { label: 'Black', value: 'black' }];
const BRANDS = [
    { label: 'Levi\'s', value: 'levis' },
    { label: 'J. Crew', value: 'jcrew' },
    { label: 'Banana Republic', value: 'bananarepublic' },
    { label: 'GAP', value: 'gap' }];
const STYLES = [
    { label: 'Casual', value: 'casual' },
    { label: 'Work', value: 'work' },
    { label: 'Night Life', value: 'nightlife' },
    { label: 'Workout', value: 'workout' }
];

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
            pantsName: '',
            pantsColor: '',
            pantsStyle: '',
            pantsBrand: '',
            pantsWearCount: 0,
            pantsWearLimit: null
        };
    },

    getInitialState () {
        return {
            pantsName: '',
            pantsColor: ''
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
                                   addPantsName={this.props.addPantsName}
                                   value={this.props.pantsName}/>
                    <FormPicker labelText="Pants Color"
                                fieldName="pantsColor"
                                inputRef="colorPicker"
                                menuOptions={COLORS}
                                isEditable={true}
                                addPantsAttribute={this.props.addPantsColor}
                                selectedValue={this.props.pantsColor}/>
                    <FormPicker labelText="Pants Brand"
                                fieldName="pantsBrand"
                                inputRef="brandPicker"
                                menuOptions={BRANDS}
                                isEditable={true}
                                addPantsAttribute={this.props.addPantsBrand}
                                selectedValue={this.props.pantsBrand}/>
                    <FormPicker labelText="Pants Style"
                                fieldName="pantsStyle"
                                inputRef="stylePicker"
                                menuOptions={STYLES}
                                isEditable={true}
                                addPantsAttribute={this.props.addPantsStyle}
                                selectedValue={this.props.pantsStyle}/>
                    <FormSlider labelText="Wear Limit"/>
                </View>
            );
        } else {
            return (
                <View ref="updatePantsForm">
                    <FormTextInput labelText="Pants Name"
                                   required={true}
                                   validation="Please enter a name for your pants"
                                   fieldName="pantsName"
                                   inputRef="nameInput"
                                   addPantsName={this.props.addPantsName}
                                   value={this.props.pantsName}/>
                    <FormPicker labelText="Pants Color"
                                fieldName="pantsColor"
                                inputRef="colorPicker"
                                menuOptions={COLORS}
                                isEditable={true}
                                addPantsAttribute={this.props.addPantsColor}
                                selectedValue={this.props.pantsColor}/>
                    <FormPicker labelText="Pants Brand"
                                fieldName="pantsBrand"
                                inputRef="brandPicker"
                                menuOptions={BRANDS}
                                isEditable={true}
                                addPantsAttribute={this.props.addPantsBrand}
                                selectedValue={this.props.pantsBrand}/>
                    <FormPicker labelText="Pants Style"
                                fieldName="pantsStyle"
                                inputRef="stylePicker"
                                menuOptions={STYLES}
                                isEditable={true}
                                addPantsAttribute={this.props.addPantsStyle}
                                selectedValue={this.props.pantsStyle}/>
                    <FormSlider labelText="Wear Limit"/>
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

    addPantsToDB () {
        this.props.addPantsData();
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