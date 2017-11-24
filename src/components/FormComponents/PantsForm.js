import React from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    Image,
    Keyboard,
    ScrollView,
    StyleSheet,
    View
} from 'react-native';
import Modal from 'react-native-modal';
import { DBEvents } from 'react-native-db-models';
import update from 'immutability-helper';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { run, ruleRunner } from '../../utils/ruleRunner.js';
import { required, mustChoose, minLength } from '../../utils/rules.js';
import { FormTile, FormAttribute } from './FormComponents';

import { get, isEmpty } from 'lodash';

import Header from '../Header';
import FormTextInput from './FormTextInput';
import FormPicker from './FormPicker';
import FormSlider from './FormSlider';
import FormStyles from '../../styles/FormStyles';
import BackgroundImage from '../../../assets/backgrounds/redPlaid.png';

const fieldValidations = [
    ruleRunner('pantsName', 'Pants Name', required, minLength(3)),
    ruleRunner('pantsColor', 'Pants Color', mustChoose),
    ruleRunner('pantsBrand', 'Pants Brand', mustChoose),
    ruleRunner('pantsStyle', 'Pants Style', mustChoose)
];

const fieldsToValidate = ['pantsName', 'pantsColor', 'pantsBrand', 'pantsStyle'];

class PantsForm extends React.Component {
    constructor() {
        super();
    }

    static propTypes = {
        fetchBrandsData: PropTypes.func,
        fetchColorsData: PropTypes.func,
        fetchStylesData: PropTypes.func,
        retrievePantsData: PropTypes.func,
        validateForm: PropTypes.func,
        submitFormData: PropTypes.func,
        brandValues: PropTypes.object,
        colorValues: PropTypes.object,
        styleValues: PropTypes.object,
        selected: PropTypes.bool
    };

    static defaultProps = {
        pantsImg: null,
        pantsName: '',
        pantsColor: '',
        pantsColorHex: '',
        pantsStyle: '',
        pantsBrand: '',
        pantsWearCount: 0,
        pantsWearLimit: null,
        lastWornDate: '',
        selected: false,
        route: {
            updateId: null
        }
    };

    state = {
        modalVisible: false,
        optionType: '',
        showErrors: false,
        validationErrors: {},
        datePickerIsVisible: false
    };

    componentWillMount() {
        const navigate = this.props.navigation;
        // Run validations on initial state
        this.setState({ validationErrors: run(this.state, fieldValidations) });

        if (navigate.state.params && navigate.state.params.updateId) {
            this.props.retrievePantsData(navigate.state.params && navigate.state.params.updateId);
        }

        //FIXME: A check should be made to see if picker data already exists/is cached
        this.fetchPickerData();
    }

    componentDidMount() {
        DBEvents.on('all', this.fetchPickerData);
    }

    componentWillReceiveProps(nextProps) {
        for (let field of fieldsToValidate) {
            if (nextProps[field] !== this.props[field]) {
                this.validateField(field)(nextProps[field]);
            }
        }
    }

    fetchPickerData = () => {
        this.props.fetchBrandsData();
        this.props.fetchColorsData();
        this.props.fetchStylesData();
    };

    onAddOptionSelected = (optionType) => {
        this.setState({ optionType: optionType });
        this.toggleModalVisibility(true);
    };

    toggleModalVisibility = (isVisible) => {
        this.setState({ modalVisible: isVisible });
    };

    errorFor = (field) => {
        return this.state.validationErrors[field] || '';
    };

    validateField = (field) => {
        return (fieldValue) => {
            // update() is provided by React Immutability Helpers
            // https://facebook.github.io/react/docs/update.html
            let newState = update(this.state, {
                [field]: { $set: fieldValue }
            });
            newState.validationErrors = run(newState, fieldValidations);
            this.setState(newState);
        };
    };

    validateAllFields = () => {
        for (let field of fieldsToValidate) {
            this.validateField(field)(this.props[field]);
        }
    };

    onSubmitClicked = () => {
        this.validateAllFields();

        this.setState({ showErrors: true });

        if (Object.keys(this.state.validationErrors).length > 0) {
            return null;
        }

        this.submitFormData();
    };

    onOkay = () => {
        this.submitFormData();
    };

    submitFormData = () => {
        const formData = this.compileFormData();

        if (!this.props.route.updateId) {
            this.addPantsToDB(formData);
        } else {
            this.updatePantsInDB(formData);
        }

        this.navigateToPantsList();
    };

    compileFormData = () => {
        return {
            //FIXME: This is working but I really don't like it
            pantsId: this.props.pantsId || this.props.route.updateId,
            pantsName: this.props.pantsName,
            pantsColor: this.props.pantsColor,
            pantsColorHex: this.props.pantsColorHex,
            pantsBrand: this.props.pantsBrand,
            pantsStyle: this.props.pantsStyle,
            pantsWearCount: this.props.pantsWearCount,
            pantsWearLimit: this.props.pantsWearLimit,
            lastWornDate: this.props.lastWornDate,
            selected: this.props.selected
        };
    };

    addPantsToDB = (formData) => {
        this.props.setPantsData(formData);
    };

    updatePantsInDB = (formData) => {
        this.props.updatePantsData(formData);
    };

    navigateToPantsList = () => {
        const { navigate } = this.props.navigation;

        navigate('PantsList');
    };

    onDatePickerConfirm = (datePicked) => {
        this.setState({ datePickerIsVisible: false });
        this.props.setLastWornDate(datePicked.toLocaleDateString());
    };

    onDatePickerCancel = () => {
        this.setState({ datePickerIsVisible: false });
    };

    showDatePicker = () => {
        this.setState({ datePickerIsVisible: true });
        Keyboard.dismiss();
    };

    showAddOption = () => {
        this.setState({ modalVisible: true });
    };

    hideAddOption = () => {
        this.setState({ modalVisible: false });
    };

    /*** RENDER FORM ***/
    renderForm = () => {
        return (
            <View>
                <FormTextInput
                    labelText='Pants Name'
                    fieldName='pantsName'
                    placeholderText='Name Your Pants'
                    setFieldValue={this.props.setPantsName}
                    value={this.props.pantsName}
                    showError={this.state.showErrors}
                    errorText={this.errorFor('pantsName')}/>
                <FormPicker
                    labelText='Pants Color'
                    fieldName='pantsColor'
                    promptText='Choose a Color'
                    menuOptions={this.props.colorValues}
                    isEditable={true}
                    setFieldValue={this.props.setPantsColor}
                    selectedValue={this.props.pantsColor}
                    onAddOption={this.onAddOptionSelected}
                    showError={this.state.showErrors}
                    errorText={this.errorFor('pantsColor')}/>
                <FormPicker
                    labelText='Pants Brand'
                    fieldName='pantsBrand'
                    promptText='Choose a Brand'
                    menuOptions={this.props.brandValues}
                    isEditable={true}
                    setFieldValue={this.props.setPantsBrand}
                    selectedValue={this.props.pantsBrand}
                    onAddOption={this.onAddOptionSelected}
                    showError={this.state.showErrors}
                    errorText={this.errorFor('pantsBrand')}/>
                <FormPicker
                    labelText='Pants Style'
                    fieldName='pantsStyle'
                    promptText='Choose a Style'
                    menuOptions={this.props.styleValues}
                    isEditable={true}
                    setFieldValue={this.props.setPantsStyle}
                    selectedValue={this.props.pantsStyle}
                    onAddOption={this.onAddOptionSelected}
                    showError={this.state.showErrors}
                    errorText={this.errorFor('pantsStyle')}/>
                <FormSlider
                    labelText='Wear Limit'
                    fieldName='pantsWearLimit'
                    onValueChange={this.props.setPantsWearLimit}
                    value={this.props.pantsWearLimit}/>
            </View>
        );
    };

    renderEditComponents = () => {
        const navigation = this.props.navigation;

        if (navigation.state.params && navigation.state.params.updateId) {
            return (
                <View>
                    <FormSlider
                        labelText='Wear Count'
                        fieldName='pantsWearCount'
                        onValueChange={this.props.setPantsWearCount}
                        value={this.props.pantsWearCount}/>
                    <FormTextInput
                        labelText='Last Worn Date'
                        fieldName='lastWornDate'
                        placeholderText='Last Date You Wore These Pants'
                        setFieldValue={this.props.setLastWornDate}
                        value={this.props.lastWornDate}
                        showError={false}
                        onFocus={this.showDatePicker}/>
                    <DateTimePicker
                        isVisible={this.state.datePickerIsVisible}
                        mode='date'
                        onConfirm={this.onDatePickerConfirm}
                        onCancel={this.onDatePickerCancel}
                        maximumDate={new Date()}/>
                </View>
            );
        }
    };

    render () {
        let pantsName = (isEmpty(this.props.pantsName)) ? 'Name Your Pants' : this.props.pantsName,
            pantsColor = (isEmpty(this.props.pantsColor)) ? 'Choose a Color' : this.props.pantsColor,
            pantsColorHex = (isEmpty(this.props.pantsColorHex)) ? '#FEFEFE' : this.props.pantsColorHex,
            pantsBrand = (isEmpty(this.props.pantsBrand)) ? 'Choose a Brand' : this.props.pantsBrand,
            pantsStyle = (isEmpty(this.props.pantsStyle)) ? 'Choose a Style' : this.props.pantsStyle,
            pantsWearLimit = 6,
            pantsWearCount = 0,
            lastWornDate = '10/28/2017';

        return (
            <View style={formStyles.pantsForm}>
                <View style={formStyles.topFormRow}>
                    <FormTile name={pantsName}/>
                </View>
                <ScrollView style={formStyles.bottomFormRow}>
                    <FormPicker label={'Color'} icon={'color_pallette'} value={pantsColor} menuOptions={this.props.colorValues}/>
                    <FormPicker label={'Brand'} icon={'brand'} value={pantsBrand} menuOptions={this.props.brandValues}/>
                    <FormPicker label={'Style'} icon={'style'} value={pantsStyle} menuOptions={this.props.styleValues}/>
                    <FormAttribute label={'Wear Count'} icon={'count'} value={pantsWearCount} limit={pantsWearLimit}/>
                    <FormAttribute label={'Wear Limit'} icon={'limit'} value={pantsWearLimit}/>
                    <FormAttribute label={'Last Worn'} icon={'calendar'} value={lastWornDate}/>
                </ScrollView>
            </View>
        );
    }
}

const formStyles = StyleSheet.create({
    pantsForm: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'lightgrey'
    },
    selectedForm: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'rgba(255,255,255,.85)',
        borderTopColor: '#EEEEEE',
        borderTopWidth: 1,
        height: 76,
        padding: 3,
        overflow: 'hidden',
    },
    formColumn: {
        flex: 1,
        flexDirection: 'column',
    },
    topFormRow: {
        flex: 0,
        flexDirection: 'row',
        paddingBottom: 7
    },
    bottomFormRow: {
        flex: 1,
        flexDirection: 'column'

    }
});

module.exports = PantsForm;