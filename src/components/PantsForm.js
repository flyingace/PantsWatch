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
import AddOptionModal from './AddOptionModal';
import FormTextInput from './FormTextInput';
import FormPicker from './FormPicker';
import FormSlider from './FormSlider';
import PantsListView from './PantsListView';
import FormStyles from '../styles/FormStyles';
import BackgroundImage from '../../assets/backgrounds/redPlaid.png';
import PageTitle from '../../assets/page_titles/addFormTitle.png';

const PantsForm = React.createClass({

    propTypes: {
        // pantsData: React.PropTypes.object,
        fetchBrandsData: React.PropTypes.func,
        fetchColorsData: React.PropTypes.func,
        fetchStylesData: React.PropTypes.func,
        retrievePantsData: React.PropTypes.func,
        validateForm: React.PropTypes.func,
        submitForm: React.PropTypes.func,
        brandValues: React.PropTypes.object,
        colorValues: React.PropTypes.object,
        styleValues: React.PropTypes.object
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

    componentWillMount() {
        if (this.props.route.updateId) {
            this.props.retrievePantsData(this.props.route.updateId);
        }

        this.fetchPickerData();
    },

    componentDidMount() {
        DBEvents.on('all', this.fetchPickerData)
    },

    componentWillReceiveProps(newProps) {
        console.log(newProps.colorValues);
    },

    fetchPickerData() {
        this.props.fetchBrandsData();
        this.props.fetchColorsData();
        this.props.fetchStylesData();
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
                                   setFieldValue={this.props.setPantsName}
                                   value={this.props.pantsName}/>
                    <FormPicker labelText="Pants Color"
                                fieldName="pantsColor"
                                inputRef="colorPicker"
                                menuOptions={this.props.colorValues}
                                isEditable={true}
                                setFieldValue={this.props.setPantsColor}
                                selectedValue={this.props.pantsColor}/>
                    <FormPicker labelText="Pants Brand"
                                fieldName="pantsBrand"
                                inputRef="brandPicker"
                                menuOptions={this.props.brandValues}
                                isEditable={true}
                                setFieldValue={this.props.setPantsBrand}
                                selectedValue={this.props.pantsBrand}/>
                    <FormPicker labelText="Pants Style"
                                fieldName="pantsStyle"
                                inputRef="stylePicker"
                                menuOptions={this.props.styleValues}
                                isEditable={true}
                                setFieldValue={this.props.setPantsStyle}
                                selectedValue={this.props.pantsStyle}/>
                    <FormSlider labelText="Wear Limit"
                                fieldName="pantsWearLimit"
                                inputRef="wearLimitSlider"
                                onValueChange={this.props.setPantsWearLimit}
                                value={this.props.pantsWearLimit}/>
                    <AddOptionModal
                        addOption={this.props.addOption}/>
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
                                   setFieldValue={this.props.setPantsName}
                                   value={this.props.pantsName}/>
                    <FormPicker labelText="Pants Color"
                                fieldName="pantsColor"
                                inputRef="colorPicker"
                                menuOptions={this.props.colorValues}
                                isEditable={false}
                                setFieldValue={this.props.setPantsColor}
                                selectedValue={this.props.pantsColor}/>
                    <FormPicker labelText="Pants Brand"
                                fieldName="pantsBrand"
                                inputRef="brandPicker"
                                menuOptions={this.props.brandValues}
                                isEditable={true}
                                setFieldValue={this.props.setPantsBrand}
                                selectedValue={this.props.pantsBrand}/>
                    <FormPicker labelText="Pants Style"
                                fieldName="pantsStyle"
                                inputRef="stylePicker"
                                menuOptions={this.props.stlyeValues}
                                isEditable={true}
                                setFieldValue={this.props.setPantsStyle}
                                selectedValue={this.props.pantsStyle}/>
                    <FormSlider labelText="Wear Count"
                                fieldName="pantsWearCount"
                                inputRef="wearCountSlider"
                                onValueChange={this.props.setPantsWearCount}
                                value={this.props.pantsWearCount}/>
                    <FormSlider labelText="Wear Limit"
                                fieldName="pantsWearLimit"
                                inputRef="wearLimitSlider"
                                onValueChange={this.props.setPantsWearLimit}
                                value={this.props.pantsWearLimit}/>
                    <FormTextInput labelText="Last Worn Date"
                                   required={true}
                                   fieldName="lastWornDate"
                                   inputRef="lastWornDateInput"
                                   setFieldValue={this.props.setLastWornDate}
                                   value={this.props.lastWornDate}/>
                </View>
            );
        }
    },

    compileFormData() {
        return {
            //FIXME: This is working but I really don't like it
            pantsId: this.props.pantsId || this.props.route.updateId,
            pantsName: this.props.pantsName,
            pantsColor: this.props.pantsColor,
            pantsBrand: this.props.pantsBrand,
            pantsStyle: this.props.pantsStyle,
            pantsWearCount: this.props.pantsWearCount,
            pantsWearLimit: this.props.pantsWearLimit,
            lastWornDate: this.props.lastWornDate
        }
    },

    onFormSubmit () {
        //First Step Should Be To Validate
        //Then if validated, to update the database
        //And then to go to the pants list page

        // call getValue() to get the values of the form
        let formData = this.compileFormData();
        if (!this.props.route.updateId) {
            this.addPantsToDB(formData);
        } else {
            this.updatePantsInDB(formData);
        }
    },

    addPantsToDB (formData) {
        this.props.setPantsData(formData);
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
        // this.props.navigator.replace({ component: PantsListView, name: 'Choose Pants' });
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