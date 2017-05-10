import DB from '../../db.js';
import { DBEvents } from 'react-native-db-models';

export const ADDING_OPTION = 'ADDING_OPTION';
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
    return { type: SETTING_PANTS }
}

export function addingOption() {
    return { type: ADDING_OPTION }
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

export function addOption(option, category) {
    return (dispatch) => {
        dispatch(addingOption());

        const targetDB = DB[option];

        targetDB.add({
            color: option
        })
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