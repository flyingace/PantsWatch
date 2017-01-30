import DB from '../../db.js';
import {DBEvents} from 'react-native-db-models';

export const ADD_PANTS = 'ADD_PANTS';
export const UPDATE_PANTS = 'UPDATE_PANTS';
export const SET_FORM_DATA = 'SET_FORM_DATA';


export function addPantsData(formData) {
    return (dispatch) => {
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
    }
}

export function retrievePantsData(pantsId) {
    return (dispatch) => {
        DB.pants.get_id(pantsId, (result) => {
            dispatch(setFormData({value: result[0]}));
        })
    }
}

export function setFormData(formData) {
    return {type: SET_FORM_DATA, state: formData}
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
    }
}