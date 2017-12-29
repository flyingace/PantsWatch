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
        behavesAsForm: false
    };

    setFormBehavior = (bool) => {
        this.setState({ behavesAsForm: bool });
    };

    componentWillMount() {
        const navigate = this.props.navigation;
        // Run validations on initial state
        this.setState({ validationErrors: run(this.state, fieldValidations) });

        if (navigate.state.params && navigate.state.params.updateId) {
            this.props.retrievePantsData(navigate.state.params && navigate.state.params.updateId);
        }

        if (navigate.state.routeName === 'AddPants') {
            this.setFormBehavior(true);
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

    optionallyRenderFormButtons = () => {
        if (this.state.behavesAsForm) {
            return (
                <View style={detailStyles.formButtons}>
                    <View style={detailStyles.formButtonContainer}>
                        <Button title='Cancel' onPress={() => {this.setFormBehavior(false)}}
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

    render() {
        const tempCount = [{ key: 0, label: '0' }, { key: 1, label: '1' }, { key: 2, label: '2' },
            { key: 3, label: '3' }, { key: 4, label: '4' }, { key: 5, label: '5' }, { key: 6, label: '6' },
            { key: 7, label: '7' }, { key: 8, label: '8' }, { key: 9, label: '9' }, { key: 10, label: '10' }];
        const tempLimit = [{ key: 0, label: '0' }, { key: 1, label: '1' }, { key: 2, label: '2' },
            { key: 3, label: '3' }, { key: 4, label: '4' }, { key: 5, label: '5' }, { key: 6, label: '6' },
            { key: 7, label: '7' }, { key: 8, label: '8' }, { key: 9, label: '9' }, { key: 10, label: '10' }];

        const newPantsParams = {
            pantsName: 'Name Your Pants', pantsColor: 'Choose a Color', pantsColorHex: '', pantsBrand: 'Choose a Brand',
            pantsStyle: 'Choose a Style', pantsWearCount: 0, pantsWearLimit: 6, lastWornDate: '', selected: false
        };

        const {
            pantsName, pantsColor, pantsColorHex = '#222222', pantsBrand, pantsStyle, pantsWearCount,
            pantsWearLimit, lastWornDate, selected, _id
        } = (this.props.navigation.state.params) ? this.props.navigation.state.params : newPantsParams;
        return (
            <View style={detailStyles.pantsDetail}>
                <View style={detailStyles.topDetailRow}>
                    <FormTile name={pantsName}/>
                    {this.optionallyRenderFloatingActionButton(_id)}
                </View>
                <ScrollView style={detailStyles.bottomDetailRow}>
                    <DetailRow label={'Color'} icon={'color_pallette'} value={pantsColor} hex={pantsColorHex}
                               data={this.props.colorValues} behavesAsForm={this.state.behavesAsForm}/>
                    <DetailRow label={'Brand'} icon={'brand'} value={pantsBrand} data={this.props.brandValues}
                               behavesAsForm={this.state.behavesAsForm}/>
                    <DetailRow label={'Style'} icon={'style'} value={pantsStyle} data={this.props.styleValues}
                               behavesAsForm={this.state.behavesAsForm}/>
                    <DetailRow label={'Wear Count'} icon={'count'} value={pantsWearCount} limit={pantsWearLimit}
                               data={tempCount} behavesAsForm={this.state.behavesAsForm}/>
                    <DetailRow label={'Wear Limit'} icon={'limit'} value={pantsWearLimit} data={tempLimit}
                               behavesAsForm={this.state.behavesAsForm}/>
                    <DetailAttribute label={'Last Worn'} icon={'calendar'} value={lastWornDate}
                                     behavesAsForm={this.state.behavesAsForm}/>
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
    },
    formButton: {
        color: '#009900'
    }
});
module.exports = PantsForm;