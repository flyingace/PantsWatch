import React from 'react';
import {
    Button,
    ScrollView,
    View,
    Image
} from 'react-native';
import { DBEvents } from 'react-native-db-models';
import AddOptionModal from './AddOptionModal';
import FormTextInput from './FormTextInput';
import FormPicker from './FormPicker';
import FormSlider from './FormSlider';
import FormStyles from '../styles/FormStyles';
import PantsListPage from '../containers/PantsListPage';
import BackgroundImage from '../../assets/backgrounds/redPlaid.png';
import PageTitle from '../../assets/page_titles/addFormTitle.png';

const PantsForm = React.createClass({

    getInitialState() {
        return {
            modalVisible: false,
            optionType: ''
        };
    },

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
        DBEvents.on('all', this.fetchPickerData);
    },

    componentWillReceiveProps(newProps) {
        console.log(newProps.colorValues);
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

    renderForm () {
        if (!this.props.route.updateId) {
            return (
                <View ref="addPantsForm">
                    <FormTextInput labelText="Pants Name"
                        required={ true }
                        validation="Please enter a name for your pants"
                        fieldName="pantsName"
                        inputRef="nameInput"
                        setFieldValue={ this.props.setPantsName }
                        placeholderText="Name Your Pants"
                        value={ this.props.pantsName }/>
                    <FormPicker labelText="Pants Color"
                        promptText="Choose a Color"
                        fieldName="pantsColor"
                        inputRef="colorPicker"
                        menuOptions={ this.props.colorValues }
                        isEditable={ true }
                        setFieldValue={ this.props.setPantsColor }
                        selectedValue={ this.props.pantsColor }
                        onAddOption={ this.onAddOptionSelected }/>
                    <FormPicker labelText="Pants Brand"
                        promptText="Choose a Brand"
                        fieldName="pantsBrand"
                        inputRef="brandPicker"
                        menuOptions={ this.props.brandValues }
                        isEditable={ true }
                        setFieldValue={ this.props.setPantsBrand }
                        selectedValue={ this.props.pantsBrand }
                        onAddOption={ this.onAddOptionSelected }/>
                    <FormPicker labelText="Pants Style"
                        promptText="Choose a Style"
                        fieldName="pantsStyle"
                        inputRef="stylePicker"
                        menuOptions={ this.props.styleValues }
                        isEditable={ true }
                        setFieldValue={ this.props.setPantsStyle }
                        selectedValue={ this.props.pantsStyle }
                        onAddOption={ this.onAddOptionSelected }/>
                    <FormSlider labelText="Wear Limit"
                        fieldName="pantsWearLimit"
                        inputRef="wearLimitSlider"
                        onValueChange={ this.props.setPantsWearLimit }
                        value={ this.props.pantsWearLimit }/>
                    <AddOptionModal
                        toggleModalVisibility={ this.toggleModalVisibility }
                        addOption={ this.props.addOption }
                        modalIsVisible={ this.state.modalVisible }
                        onSubmitEntry={ this.props.addOption }
                        optionType={ this.state.optionType }
                    />
                </View>
            );
        } else {
            return (
                <View ref="updatePantsForm">
                    <FormTextInput labelText="Pants Name"
                        required={ true }
                        validation="Please enter a name for your pants"
                        fieldName="pantsName"
                        inputRef="nameInput"
                        setFieldValue={ this.props.setPantsName }
                        value={ this.props.pantsName }/>
                    <FormPicker labelText="Pants Color"
                        promptText="Choose a Color"
                        fieldName="pantsColor"
                        inputRef="colorPicker"
                        menuOptions={ this.props.colorValues }
                        isEditable={ true }
                        setFieldValue={ this.props.setPantsColor }
                        selectedValue={ this.props.pantsColor }
                        onAddOption={ this.onAddOptionSelected }/>
                    <FormPicker labelText="Pants Brand"
                        promptText="Choose a Brand"
                        fieldName="pantsBrand"
                        inputRef="brandPicker"
                        menuOptions={ this.props.brandValues }
                        isEditable={ true }
                        setFieldValue={ this.props.setPantsBrand }
                        selectedValue={ this.props.pantsBrand }
                        onAddOption={ this.onAddOptionSelected }/>
                    <FormPicker labelText="Pants Style"
                        promptText="Choose a Style"
                        fieldName="pantsStyle"
                        inputRef="stylePicker"
                        menuOptions={ this.props.styleValues }
                        isEditable={ true }
                        setFieldValue={ this.props.setPantsStyle }
                        selectedValue={ this.props.pantsStyle }
                        onAddOption={ this.onAddOptionSelected }/>
                    <FormSlider labelText="Wear Count"
                        fieldName="pantsWearCount"
                        inputRef="wearCountSlider"
                        onValueChange={ this.props.setPantsWearCount }
                        value={ this.props.pantsWearCount }/>
                    <FormSlider labelText="Wear Limit"
                        fieldName="pantsWearLimit"
                        inputRef="wearLimitSlider"
                        onValueChange={ this.props.setPantsWearLimit }
                        value={ this.props.pantsWearLimit }/>
                    <FormTextInput labelText="Last Worn Date"
                        required={ true }
                        fieldName="lastWornDate"
                        inputRef="lastWornDateInput"
                        setFieldValue={ this.props.setLastWornDate }
                        value={ this.props.lastWornDate }/>
                    <AddOptionModal
                        toggleModalVisibility={ this.toggleModalVisibility }
                        addOption={ this.props.addOption }
                        modalIsVisible={ this.state.modalVisible }
                        onSubmitEntry={ this.props.addOption }
                        optionType={ this.state.optionType }
                    />
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
        };
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
        this.resetForm();
        this.navigateToPantsList();
    },

    addPantsToDB (formData) {
        this.props.setPantsData(formData);
    },

    updatePantsInDB (formData) {
        this.props.updatePantsData(formData);
    },

    resetForm () {
        this.setState({ value: null });
    },

    navigateToPantsList () {
        this.props.navigator.replace({ component: PantsListPage, name: 'Choose Pants' });
    },

    render () {

        return (
            <View>
                <Image source={ BackgroundImage } style={ FormStyles.backgroundImage }/>
                <ScrollView contentContainerStyle={ FormStyles.formWrapper } style={ FormStyles.transparentBkg }>
                    <Image source={ PageTitle } style={ FormStyles.pageTitle } resizeMode={ 'contain' }/>
                    {this.renderForm()}
                    <Button
                        onPress={ this.onFormSubmit }
                        title="Submit My Pants"
                        color="#66d8ff"
                        accessibilityLabel="Add your pants to the database"
                    />
                </ScrollView>
            </View>
        );
    }
});

module.exports = PantsForm;