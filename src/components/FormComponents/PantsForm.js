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

import DetailRow from '../DetailComponents/DetailRow';
import { DetailAttribute, DetailTile } from "../DetailComponents/DetailComponents";
import FloatingActionButton from '../FloatingActionButton';
import FormStyles from '../../styles/FormStyles';
import { setFormData } from "../../actions/FormActions";

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
        datePickerIsVisible: false,
        behavesAsForm: false,
        pantsName: '',
        pantsColor: 'Choose a Color',
        pantsColorHex: '#222222',
        pantsBrand: 'Choose a Brand',
        pantsStyle: 'Choose a Style',
        pantsWearCount: 0,
        pantsWearLimit: 6,
        lastWornDate: '',
        selected: false
    };

    setFormBehavior = (bool) => {
        this.setState({ behavesAsForm: bool });
    };

    componentWillMount() {
        const navigate = this.props.navigation;

        if (navigate.state.params && navigate.state.params._id) {
            this.setState(navigate.state.params);
        } else {
            this.setFormBehavior(true);
        }

        // Run validations on initial state
        this.setState({ validationErrors: run(this.state, fieldValidations) });

        //FIXME: A check should be made to see if picker data already exists/is cached
        this.fetchPickerData();
    }

    componentDidMount() {
        DBEvents.on('all', this.fetchPickerData);
    }

    componentWillReceiveProps(nextProps) {
        /* for (let field of fieldsToValidate) {
            if (nextProps[field] !== this.props[field]) {
                this.validateField(field)(nextProps[field]);
            }
        } */
    }

    fetchPickerData = () => {
        //these should be grouped as promisesAll if possible
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

    onCancelClicked = () => {
        if (this.state._id) {
            this.setFormBehavior(false);
        } else {
            this.props.navigation.navigate('Home')
        }
    };

    onSubmitClicked = () => {
        // this.validateAllFields();
        //
        // this.setState({ showErrors: true });
        //
        // if (Object.keys(this.state.validationErrors).length > 0) {
        //     return null;
        // }

        this.submitFormData();
    };

    onOkay = () => {
        this.submitFormData();
    };

    submitFormData = () => {
        const formData = this.compileFormData();

        if (!this.state._id) {
            this.addPantsToDB(formData);
            this.props.navigation.navigate('PantsList');
        } else {
            this.updatePantsInDB(formData);
            this.props.navigation.goBack();
        }
    };

    compileFormData = () => {
        return {
            _id: this.state._id,
            pantsName: this.state.pantsName,
            pantsColor: this.state.pantsColor,
            pantsColorHex: this.state.pantsColorHex,
            pantsBrand: this.state.pantsBrand,
            pantsStyle: this.state.pantsStyle,
            pantsWearCount: this.state.pantsWearCount,
            pantsWearLimit: this.state.pantsWearLimit,
            lastWornDate: this.state.lastWornDate,
            selected: this.state.selected
        };
    };

    addPantsToDB = (formData) => {
        this.props.setPantsData(formData);
    };

    updatePantsInDB = (formData) => {
        this.props.updatePantsData(formData);
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

    optionallyRenderFormButtons = () => {
        if (this.state.behavesAsForm) {
            return (
                <View style={detailStyles.formButtons}>
                    <View style={detailStyles.formButtonContainer}>
                        <Button title='Cancel' onPress={this.onCancelClicked} color={'red'}
                                style={detailStyles.formButton}/>
                    </View>
                    <View style={detailStyles.formButtonContainer}>
                        <Button title='Submit' onPress={this.onSubmitClicked} color={'green'}
                                style={detailStyles.formButton}/>
                    </View>
                </View>
            )
        }
    };

    optionallyRenderFloatingActionButton = (id) => {
        if (!this.state.behavesAsForm) {
            return (
                <FloatingActionButton {...this.props} pantsId={id} turnOnForm={this.setFormBehavior}/>
            )
        }
    };

    updateField = (field, values) => {
        switch (field) {
        case 'Name':
            this.setState({ pantsName: values});
            break;
        case 'Color':
            this.setState({ pantsColor: values.label, pantsColorHex: values.hex });
            break;
        case 'Brand':
            this.setState({ pantsBrand: values.label });
            break;
        case 'Style':
            this.setState({ pantsStyle: values.label });
            break;
        case 'Wear Count':
            this.setState({ pantsWearCount: Number.parseInt(values.label, 10) });
            break;
        case 'Wear Limit':
            this.setState({ pantsWearLimit: Number.parseInt(values.label, 10) });
            break;
        case 'Last Worn':
            this.setState({ lastWornDate: values.label });
            break;
        default:
            break;
        }
    };

    render() {
        const tempCount = [{ key: 0, label: '0' }, { key: 1, label: '1' }, { key: 2, label: '2' },
            { key: 3, label: '3' }, { key: 4, label: '4' }, { key: 5, label: '5' }, { key: 6, label: '6' },
            { key: 7, label: '7' }, { key: 8, label: '8' }, { key: 9, label: '9' }, { key: 10, label: '10' }];
        const tempLimit = [{ key: 0, label: '0' }, { key: 1, label: '1' }, { key: 2, label: '2' },
            { key: 3, label: '3' }, { key: 4, label: '4' }, { key: 5, label: '5' }, { key: 6, label: '6' },
            { key: 7, label: '7' }, { key: 8, label: '8' }, { key: 9, label: '9' }, { key: 10, label: '10' }];

        const {
            pantsName, pantsColor, pantsColorHex = '#222222', pantsBrand, pantsStyle, pantsWearCount,
            pantsWearLimit, lastWornDate, selected, _id, behavesAsForm
        } = this.state;

        return (
            <View style={detailStyles.pantsDetail}>
                <View style={detailStyles.topDetailRow}>
                    <FormTile name={pantsName} isEditable={behavesAsForm} setFieldValue={this.updateField}/>
                    {this.optionallyRenderFloatingActionButton(_id)}
                </View>
                <ScrollView style={detailStyles.bottomDetailRow}>
                    <DetailRow label={'Color'} icon={'color_pallette'} value={pantsColor} hex={pantsColorHex}
                               data={this.props.colorValues} setFieldValue={this.updateField}
                               behavesAsForm={behavesAsForm}/>
                    <DetailRow label={'Brand'} icon={'brand'} value={pantsBrand} data={this.props.brandValues}
                               setFieldValue={this.updateField}
                               behavesAsForm={behavesAsForm}/>
                    <DetailRow label={'Style'} icon={'style'} value={pantsStyle} data={this.props.styleValues}
                               setFieldValue={this.updateField}
                               behavesAsForm={behavesAsForm}/>
                    <DetailRow label={'Wear Count'} icon={'count'} value={pantsWearCount} limit={pantsWearLimit}
                               setFieldValue={this.updateField}
                               data={tempCount} behavesAsForm={behavesAsForm}/>
                    <DetailRow label={'Wear Limit'} icon={'limit'} value={pantsWearLimit} data={tempLimit}
                               setFieldValue={this.updateField}
                               behavesAsForm={behavesAsForm}/>
                    <DetailAttribute label={'Last Worn'} icon={'calendar'} value={lastWornDate}
                                     setFieldValue={this.updateField}
                                     behavesAsForm={behavesAsForm}/>
                    {this.optionallyRenderFormButtons()}
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
        marginBottom: 2
    },
    bottomDetailRow: {
        flex: 1,
        flexDirection: 'column'

    },
    formButtons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    formButtonContainer: {
        flex: 1
    }
});
module.exports = PantsForm;