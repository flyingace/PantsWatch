'use strict';

import Realm from 'realm';

const PantsSchema = {
    name: 'Pants',
    primaryKey: 'id',
    properties: {
        id: 'int',
        pantsImg: {type: 'string', default: '../assets/pants01.png'},
        pantsName: 'string',
        pantsColor: 'Color',
        pantsStyle: 'Style',
        pantsBrand: 'Brand',
        wearLimit: {type: 'int', default: 6},
        dateAdded: 'date',
        lastWorn: 'date'
    }
};

const ColorSchema = {
    name: 'Color',
    primaryKey: 'id',
    properties: {
        id: 'int',
        styleName: 'string'
    }
};

const StyleSchema = {
    name: 'Style',
    primaryKey: 'id',
    properties: {
        id: 'int',
        styleName: 'string'
    },
};

const BrandSchema = {
    name: 'Brand',
    primaryKey: 'id',
    properties: {
        id: 'int',
        brandName: 'string'
    },
};

const SettingsSchema = {
    name: 'Settings',
    properties: {
        defaultWearLimit: {type: 'int', default: 6},
        promptWhich: {type: 'bool', default: true},
        promptTime: {type: 'string', default: true},
        promptRepeat: {type: 'bool', default: true},
        promptRepeatInterval: {type: 'int', default: 30},
        outOfPantsWarning: {type: 'bool', default: true},
    },
};

let realm = new Realm({
    schema: [PantsSchema, ColorSchema, StyleSchema, BrandSchema, SettingsSchema], schemaVersion: 1
});