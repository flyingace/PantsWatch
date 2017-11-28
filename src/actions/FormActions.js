import DB from '../../db.js';
import moment from 'moment';

export const ADDING_OPTION = 'ADDING_OPTION';
export const CLEAR_FORM_DATA = 'CLEAR_FORM_DATA';
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
export const SET_PANTS_COLOR_HEX = 'SET_PANTS_COLOR_HEX';
export const SET_PANTS_STYLE = 'SET_PANTS_STYLE';
export const SET_PANTS_WEAR_COUNT = 'SET_PANTS_WEAR_COUNT';
export const SET_PANTS_WEAR_LIMIT = 'SET_PANTS_WEAR_LIMIT';
export const SET_PANTS_LAST_WORN_DATE = 'SET_PANTS_LAST_WORN_DATE';
export const SET_PANTS_SELECTED = 'SET_PANTS_SELECTED';
export const SETTING_PANTS = 'SETING_PANTS';
export const SET_FORM_DATA = 'SET_FORM_DATA';
export const UPDATING_PANTS = 'UPDATING_PANTS';
export const RECEIVE_PANTS_DATA = 'RECEIVE_PANTS_DATA';
export const DELETE_PANTS = 'DELETE_PANTS';

export function settingPants() {
    return { type: SETTING_PANTS };
}

export function setPantsData(formData) {

    return (dispatch) => {
        dispatch(settingPants());

        DB.pants.add({
            pantsName: formData.pantsName,
            pantsColor: formData.pantsColor,
            pantsColorHex: formData.pantsColorHex,
            pantsBrand: formData.pantsBrand,
            pantsStyle: formData.pantsStyle,
            pantsWearCount: 0,
            pantsWearLimit: formData.pantsWearLimit,
            lastWornDate: '',
            selected: false
            // addedOn: value.addedOnDate,
            // notes: value.notes

        }, () => {
            dispatch(clearFormOnSubmit());
        });
    };
}

//could all these 'setPants...' be curried into a single function? Is there a reason not to do that?
export function setPantsId(idOfPants) {
    return { type: SET_PANTS_ID, state: idOfPants };
}

export function setPantsName(nameOfPants) {
    return { type: SET_PANTS_NAME, state: nameOfPants };
}

export function setPantsColor(colorOfPants) {
    return { type: SET_PANTS_COLOR, state: colorOfPants };
}

export function setPantsColorHex(hexValueOfPantsColor) {
    return { type: SET_PANTS_COLOR_HEX, state: hexValueOfPantsColor };
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

export function setSelected(selected) {
    return { type: SET_PANTS_SELECTED, state: selected };
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
            dispatch(setSelected(pantsData.selected));
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
            pantsColorHex: formData.pantsColorHex,
            pantsBrand: formData.pantsBrand,
            pantsStyle: formData.pantsStyle,
            pantsWearCount: formData.pantsWearCount,
            pantsWearLimit: formData.pantsWearLimit,
            lastWornDate: formData.lastWornDate,
            selected: formData.selected
        }, () => {
            dispatch(clearFormOnSubmit());
        });
    };
}

export function resetWearCount(pantsId) {
    return (dispatch) => {
        DB.pants.update_id(pantsId, { pantsWearCount: 0 }, (data) => {
            dispatch(receivePantsData(data.pants));
        });
    };
}

export function deletePants(pantsId) {
    return (dispatch) => {
        DB.pants.remove_id(pantsId);
        dispatch(deletePantsData());
    }
}

export function receivePantsData(data) {
    return { type: RECEIVE_PANTS_DATA, state: data };
}

export function deletePantsData() {
    return { type: DELETE_PANTS };
}

export function addOption(category, valueToAdd) {
    return (dispatch) => {
        dispatch(addingOption());

        const targetDB = DB[category];

        targetDB.add({
            value: valueToAdd
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
    const massagedData = modifyDataShape(data);
    return { type: RECEIVE_BRANDS_DATA, state: massagedData };
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
    const massagedData = modifyDataShape(data);
    return { type: RECEIVE_COLORS_DATA, state: massagedData };
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
    const massagedData = modifyDataShape(data);
    return { type: RECEIVE_STYLES_DATA, state: massagedData };
}

export function clearFormOnSubmit() {
    return { type: CLEAR_FORM_DATA };
}

/**
 * Changes the data.rows object into an array
 * Adds a "key" key to each object in data.rows copied from _id
 * Replaces row.value with row.label
 * @param data
 */
function modifyDataShape(data) {
    if (data.rows) {
        data.rows = Object.values(data.rows);
    }

    data.rows.forEach((row) => {
        row.key = row._id;
        row.label = row.value;
        delete row.value;
    });

    return data.rows;
}

export function selectPants(pantsId) {
    return (dispatch) => {
        DB.pants.update({ selected: true }, { selected: false }, (results) => {
            DB.pants.get_id(pantsId, (result) => {
                const oldCount = result[0].pantsWearCount || 0;
                const newCount = oldCount + 1;
                const lastWorn = moment().format('L');

                DB.pants.update_id(pantsId, {
                    selected: true,
                    pantsWearCount: newCount,
                    lastWornDate: lastWorn
                }, (data) => {
                    dispatch(receivePantsData(data.pants));
                });
            });
        });
    };
}

