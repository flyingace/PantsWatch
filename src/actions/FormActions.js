import DB from '../../db.js';
import { DBEvents } from 'react-native-db-models';
import { toTitleCase, toDBReadyValue } from '../utils/appUtils';

export const ADDING_OPTION = 'ADDING_OPTION';
export const RECEIVE_BRANDS_DATA = 'RECEIVE_BRANDS_DATA';
export const REQUEST_BRANDS_DATA = 'REQUEST_BRANDS_DATA';
export const RECEIVE_COLORS_DATA = 'RECEIVE_COLORS_DATA';
export const REQUEST_COLORS_DATA = 'REQUEST_COLORS_DATA';
export const RECEIVE_STYLES_DATA = 'RECEIVE_STYLES_DATA';
export const REQUEST_STYLES_DATA = 'REQUEST_STYLES_DATA';
export const SET_PANTS_ID = 'SET_PANTS_ID';
export const SET_PANTS_NAME = 'SET_PANTS_NAME';
export const SET_PANTS_BRAND = 'SET_PANTS_BRAND';
export const SET_PANTS_COLOR = 'SET_PANTS_COLOR';
export const SET_PANTS_STYLE = 'SET_PANTS_STYLE';
export const SET_PANTS_WEAR_COUNT = 'SET_PANTS_WEAR_COUNT';
export const SET_PANTS_WEAR_LIMIT = 'SET_PANTS_WEAR_LIMIT';
export const SET_PANTS_LAST_WORN_DATE = 'SET_PANTS_LAST_WORN_DATE';
export const SETTING_PANTS = 'SETING_PANTS';
export const SET_FORM_DATA = 'SET_FORM_DATA';
export const UPDATING_PANTS = 'UPDATING_PANTS';

export function settingPants() {
    return { type: SETTING_PANTS };
}

export function setPantsData(formData) {

    return (dispatch) => {
        dispatch(settingPants());

        DB.pants.add({
            pantsName: formData.pantsName,
            pantsColor: formData.pantsColor,
            pantsBrand: formData.pantsBrand,
            pantsStyle: formData.pantsStyle,
            pantsWearCount: 0,
            pantsWearLimit: formData.pantsWearLimit,
            lastWornDate: '',
            selected: false
            // addedOn: value.addedOnDate,
            // notes: value.notes

        });
    };
}

export function setPantsId(idOfPants) {
    return { type: SET_PANTS_ID, state: idOfPants };
}

export function setPantsName(nameOfPants) {
    return { type: SET_PANTS_NAME, state: nameOfPants };
}

export function setPantsColor(colorOfPants) {
    return { type: SET_PANTS_COLOR, state: colorOfPants };
}

export function setPantsBrand(brandOfPants) {
    return { type: SET_PANTS_BRAND, state: brandOfPants };
}

export function setPantsStyle(styleOfPants) {
    return { type: SET_PANTS_STYLE, state: styleOfPants };
}

export function setPantsWearCount(wearCountOfPants) {
    return { type: SET_PANTS_WEAR_COUNT, state: wearCountOfPants };
}

export function setPantsWearLimit(wearLimitOfPants) {
    return { type: SET_PANTS_WEAR_LIMIT, state: wearLimitOfPants };
}

export function setLastWornDate(lastWornDateOfPants) {
    return { type: SET_PANTS_LAST_WORN_DATE, state: lastWornDateOfPants };
}

export function retrievePantsData(pantsId) {
    return (dispatch) => {
        DB.pants.get_id(pantsId, (result) => {
            let pantsData = result[0];
            dispatch(setPantsId(pantsData._id));
            dispatch(setPantsName(pantsData.pantsName));
            dispatch(setPantsColor(pantsData.pantsColor));
            dispatch(setPantsBrand(pantsData.pantsBrand));
            dispatch(setPantsStyle(pantsData.pantsStyle));
            dispatch(setPantsWearCount(pantsData.pantsWearCount));
            dispatch(setPantsWearLimit(pantsData.pantsWearLimit));
            dispatch(setLastWornDate(pantsData.lastWornDate));
        });
    };
}

export function setFormData(formData) {
    return { type: SET_FORM_DATA, state: formData };
}

export function updatePantsData(formData) {
    return (dispatch) => {
        DB.pants.update_id(formData.pantsId, {
            pantsName: formData.pantsName,
            pantsColor: formData.pantsColor,
            pantsBrand: formData.pantsBrand,
            pantsStyle: formData.pantsStyle,
            pantsWearCount: formData.pantsWearCount,
            pantsWearLimit: formData.pantsWearLimit,
            lastWornDate: formData.lastWornDate,
            selected: formData.selected
        });
    };
}

export function addOption(category, option) {
    return (dispatch) => {
        dispatch(addingOption());

        const targetDB = DB[category];
        const newLabel = toTitleCase(option);
        const newValue = toDBReadyValue(option);

        targetDB.add({
            label: newLabel, value: newValue
        });
    };
}

export function addingOption() {
    return { type: ADDING_OPTION };
}

//Brands
export function fetchBrandsData() {
    return (dispatch) => {
        dispatch(requestBrandsData());

        return DB.brands.get_all((data) => {
            dispatch(receiveBrandsData(data));
        });
    };
}

export function requestBrandsData() {
    return { type: REQUEST_BRANDS_DATA };
}

export function receiveBrandsData(data) {
    return { type: RECEIVE_BRANDS_DATA, state: data };
}

//Colors
export function fetchColorsData() {
    return (dispatch) => {
        dispatch(requestColorsData());

        return DB.colors.get_all((data) => {
            dispatch(receiveColorsData(data));
        });
    };
}

export function requestColorsData() {
    return { type: REQUEST_COLORS_DATA };
}

export function receiveColorsData(data) {
    return { type: RECEIVE_COLORS_DATA, state: data };
}

//Styles
export function fetchStylesData() {
    return (dispatch) => {
        dispatch(requestStylesData());

        return DB.styles.get_all((data) => {
            dispatch(receiveStylesData(data));
        });
    };
}

export function requestStylesData() {
    return { type: REQUEST_STYLES_DATA };
}

export function receiveStylesData(data) {
    return { type: RECEIVE_STYLES_DATA, state: data };
}
