import React from 'react';
import {
    Button,
    Image,
    Keyboard,
    ScrollView,
    View
} from 'react-native';
import { DBEvents } from 'react-native-db-models';
import update from 'immutability-helper';
import _ from 'lodash';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { run, ruleRunner } from '../utils/ruleRunner.js';
import { required, mustChoose, minLength } from '../utils/rules.js';

import AddOptionModal from './AddOptionModal';
import FormTextInput from './FormTextInput';
import FormPicker from './FormPicker';
import FormSlider from './FormSlider';
import FormStyles from '../styles/FormStyles';
import PantsListPage from '../containers/PantsListPage';
import BackgroundImage from '../../assets/backgrounds/redPlaid.png';
import PageTitle from '../../assets/page_titles/addFormTitle.png';

const fieldValidations = [
    ruleRunner('pantsName', 'Pants Name', required, minLength(3)),
    ruleRunner('pantsColor', 'Pants Color', mustChoose),
    ruleRunner('pantsBrand', 'Pants Brand', mustChoose),
    ruleRunner('pantsStyle', 'Pants Style', mustChoose),
    // ruleRunner('lastWornDate', 'Last Worn Date', required)
];

const fieldsToValidate = ['pantsName', 'pantsColor', 'pantsBrand', 'pantsStyle' /*, 'lastWorn'*/];

const PantsForm = React.createClass({

    propTypes: {
        // pantsData: React.PropTypes.object,
        fetchBrandsData: React.PropTypes.func,
        fetchColorsData: React.PropTypes.func,
        fetchStylesData: React.PropTypes.func,
        retrievePantsData: React.PropTypes.func,
        validateForm: React.PropTypes.func,
        submitFormData: React.PropTypes.func,
        brandValues: React.PropTypes.object,
        colorValues: React.PropTypes.object,
        styleValues: React.PropTypes.object,
        selected: React.PropTypes.bool
    },

    getInitialState() {
        return {
            modalVisible: false,
            optionType: '',
            showErrors: false,
            validationErrors: {},
            datePickerIsVisible: false
        };
    },

    getDefaultProps () {
        return {
            pantsImg: null,
            pantsName: '',
            pantsColor: '',
            pantsStyle: '',
            pantsBrand: '',
            pantsWearCount: 0,
            pantsWearLimit: null,
            lastWornDate: '',
            selected: false
        };
    },

    componentWillMount() {
        // Run validations on initial state
        this.setState({ validationErrors: run(this.state, fieldValidations) });

        if (this.props.route.updateId) {
            this.props.retrievePantsData(this.props.route.updateId);
        }

        //FIXME: A check should be made to see if picker data already exists/is cached
        this.fetchPickerData();
    },

    componentDidMount() {
        DBEvents.on('all', this.fetchPickerData);
    },

    componentWillReceiveProps(nextProps) {
        for (let field of fieldsToValidate) {
            if (nextProps[field] !== this.props[field]) {
                this.validateField(field)(nextProps[field]);
            }
        }
    },

    fetchPickerData() {
        this.props.fetchBrandsData();
        this.props.fetchColorsData();
        this.props.fetchStylesData();
    },

    onAddOptionSelected(optionType) {
        this.setState({ optionType: optionType });
        this.toggleModalVisibility(true);
    },

    toggleModalVisibility(isVisible) {
        this.setState({ modalVisible: isVisible });
    },

    errorFor(field) {
        return this.state.validationErrors[field] || '';
    },

    validateField(field) {
        return (fieldValue) => {
            // update() is provided by React Immutability Helpers
            // https://facebook.github.io/react/docs/update.html
            let newState = update(this.state, {
                [field]: { $set: fieldValue }
            });
            newState.validationErrors = run(newState, fieldValidations);
            this.setState(newState);
        };
    },

    validateAllFields() {
        for (let field of fieldsToValidate) {
            this.validateField(field)(this.props[field]);
        }
    },

    onSubmitClicked() {
        this.validateAllFields();

        this.setState({ showErrors: true });

        if (Object.keys(this.state.validationErrors).length > 0) {
            return null;
        }

        this.submitFormData();
    },

    submitFormData () {
        const formData = this.compileFormData();
        if (!this.props.route.updateId) {
            this.addPantsToDB(formData);
        } else {
            this.updatePantsInDB(formData);
        }
        this.navigateToPantsList();
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
            lastWornDate: this.props.lastWornDate,
            selected: this.props.selected
        };
    },

    addPantsToDB (formData) {
        this.props.setPantsData(formData);
    },

    updatePantsInDB (formData) {
        this.props.updatePantsData(formData);
    },

    navigateToPantsList () {
        this.props.navigator.replace({ component: PantsListPage, name: 'Choose Pants' });
    },

    onDatePickerConfirm(datePicked) {
        this.setState({ datePickerIsVisible: false });
        this.props.setLastWornDate(datePicked.toLocaleDateString());
    },

    onDatePickerCancel() {
        this.setState({ datePickerIsVisible: false });
    },

    showDatePicker() {
        this.setState({ datePickerIsVisible: true });
        Keyboard.dismiss();
    },

    /*** RENDER FORM ***/
    renderForm () {
        if (!this.props.route.updateId) {
            return (
                <View ref='addPantsForm'>
                    <FormTextInput
                        labelText='Pants Name'
                        fieldName='pantsName'
                        placeholderText='Name Your Pants'
                        setFieldValue={ this.props.setPantsName }
                        value={ this.props.pantsName }
                        showError={ this.state.showErrors }
                        errorText={ this.errorFor('pantsName') }/>
                    <FormPicker
                        labelText='Pants Color'
                        fieldName='pantsColor'
                        promptText='Choose a Color'
                        menuOptions={ this.props.colorValues }
                        isEditable={ true }
                        setFieldValue={ this.props.setPantsColor }
                        selectedValue={ this.props.pantsColor }
                        onAddOption={ this.onAddOptionSelected }
                        showError={ this.state.showErrors }
                        errorText={ this.errorFor('pantsColor') }/>
                    <FormPicker
                        labelText='Pants Brand'
                        fieldName='pantsBrand'
                        promptText='Choose a Brand'
                        menuOptions={ this.props.brandValues }
                        isEditable={ true }
                        setFieldValue={ this.props.setPantsBrand }
                        selectedValue={ this.props.pantsBrand }
                        onAddOption={ this.onAddOptionSelected }
                        showError={ this.state.showErrors }
                        errorText={ this.errorFor('pantsBrand') }/>
                    <FormPicker
                        labelText='Pants Style'
                        fieldName='pantsStyle'
                        promptText='Choose a Style'
                        menuOptions={ this.props.styleValues }
                        isEditable={ true }
                        setFieldValue={ this.props.setPantsStyle }
                        selectedValue={ this.props.pantsStyle }
                        onAddOption={ this.onAddOptionSelected }
                        showError={ this.state.showErrors }
                        errorText={ this.errorFor('pantsStyle') }/>
                    <FormSlider
                        labelText='Wear Limit'
                        fieldName='pantsWearLimit'
                        onValueChange={ this.props.setPantsWearLimit }
                        value={ this.props.pantsWearLimit }/>
                    <AddOptionModal
                        toggleModalVisibility={ this.toggleModalVisibility }
                        addOption={ this.props.addOption }
                        modalIsVisible={ this.state.modalVisible }
                        optionType={ this.state.optionType }/>
                </View>
            );
        } else {
            return (
                <View ref='updatePantsForm'>
                    <FormTextInput
                        labelText='Pants Name'
                        fieldName='pantsName'
                        placeholderText='Name Your Pants'
                        setFieldValue={ this.props.setPantsName }
                        value={ this.props.pantsName }
                        showError={ this.state.showErrors }
                        errorText={ this.errorFor('pantsName') }/>
                    <FormPicker
                        labelText='Pants Color'
                        fieldName='pantsColor'
                        promptText='Choose a Color'
                        menuOptions={ this.props.colorValues }
                        isEditable={ true }
                        setFieldValue={ this.props.setPantsColor }
                        selectedValue={ this.props.pantsColor }
                        onAddOption={ this.onAddOptionSelected }
                        showError={ this.state.showErrors }
                        errorText={ this.errorFor('pantsColor') }/>
                    <FormPicker
                        labelText='Pants Brand'
                        fieldName='pantsBrand'
                        promptText='Choose a Brand'
                        menuOptions={ this.props.brandValues }
                        isEditable={ true }
                        setFieldValue={ this.props.setPantsBrand }
                        selectedValue={ this.props.pantsBrand }
                        onAddOption={ this.onAddOptionSelected }
                        showError={ this.state.showErrors }
                        errorText={ this.errorFor('pantsBrand') }/>
                    <FormPicker
                        labelText='Pants Style'
                        fieldName='pantsStyle'
                        promptText='Choose a Style'
                        menuOptions={ this.props.styleValues }
                        isEditable={ true }
                        setFieldValue={ this.props.setPantsStyle }
                        selectedValue={ this.props.pantsStyle }
                        onAddOption={ this.onAddOptionSelected }
                        showError={ this.state.showErrors }
                        errorText={ this.errorFor('pantsStyle') }/>
                    <FormSlider
                        labelText='Wear Count'
                        fieldName='pantsWearCount'
                        onValueChange={ this.props.setPantsWearCount }
                        value={ this.props.pantsWearCount }/>
                    <FormSlider
                        labelText='Wear Limit'
                        fieldName='pantsWearLimit'
                        onValueChange={ this.props.setPantsWearLimit }
                        value={ this.props.pantsWearLimit }/>
                    <FormTextInput
                        labelText='Last Worn Date'
                        fieldName='lastWornDate'
                        placeholderText='Last Date You Wore These Pants'
                        setFieldValue={ this.props.setLastWornDate }
                        value={ this.props.lastWornDate }
                        showError={ this.state.showErrors }
                        errorText={ this.errorFor('lastWornDate') }
                        onFocus={ this.showDatePicker } />
                    <AddOptionModal
                        toggleModalVisibility={ this.toggleModalVisibility }
                        addOption={ this.props.addOption }
                        modalIsVisible={ this.state.modalVisible }
                        optionType={ this.state.optionType }/>
                    <DateTimePicker
                        isVisible={ this.state.datePickerIsVisible }
                        mode='date'
                        onConfirm={ this.onDatePickerConfirm }
                        onCancel={ this.onDatePickerCancel }
                        datePickerModeAndroid='spinner'
                        maximumDate = { new Date() }/>
                </View>
            );
        }
    },

    render () {

        return (
            <View>
                <Image source={ BackgroundImage } style={ FormStyles.backgroundImage }/>
                <ScrollView contentContainerStyle={ FormStyles.formWrapper } style={ FormStyles.transparentBkg }>
                    <Image source={ PageTitle } style={ FormStyles.pageTitle } resizeMode={ 'contain' }/>
                    {this.renderForm()}
                    <Button
                        onPress={ this.onSubmitClicked }
                        title='Submit My Pants'
                        color='#66d8ff'
                        accessibilityLabel='Add your pants to the database'
                    />
                </ScrollView>
            </View>
        );
    }
});

module.exports = PantsForm;