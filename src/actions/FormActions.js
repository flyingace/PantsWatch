import DB from '../../db.js';
import { DBEvents } from 'react-native-db-models';

export const ADD_PANTS_BRAND = 'ADD_PANTS_BRAND';
export const ADD_PANTS_COLOR = 'ADD_PANTS_COLOR';
export const ADD_PANTS_NAME = 'SET_PANTS_NAME';
export const ADD_PANTS_STYLE = 'ADD_PANTS_STYLE';
export const ADDING_PANTS = 'ADDING_PANTS';
export const SET_FORM_DATA = 'SET_FORM_DATA';
export const UPDATING_PANTS = 'UPDATING_PANTS';

export function addingPants() {
    return { type: ADDING_PANTS}
}
export function addPants(formData) {

    return (dispatch) => {
        dispatch(addingPants());

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

export function addPantsName(nameOfPants) {
    return { type: ADD_PANTS_NAME, state: nameOfPants};
}

export function addPantsColor(colorOfPants) {
    return { type:ADD_PANTS_COLOR, state: colorOfPants};
}

export function addPantsBrand(brandOfPants) {
    return { type:ADD_PANTS_BRAND, state: brandOfPants};
}

export function addPantsStyle(styleOfPants) {
    return { type:ADD_PANTS_STYLE, state: styleOfPants};
}



export function retrievePantsData(pantsId) {
    return (dispatch) => {
        DB.pants.get_id(pantsId, (result) => {
            dispatch(setFormData({ value: result[0] }));
        });
    };
}

export function setFormData(formData) {
    return { type: SET_FORM_DATA, state: formData };
}

export function updatePantsData(formData) {
    return (dispatch) => {
        DB.pants.update_id(formData._id, {
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