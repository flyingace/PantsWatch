'use strict';

import Realm from 'realm';

const PantsSchema = {
    name: 'Pants',
    // primaryKey: 'id',
    properties: {
        id: {type: 'int', optional: true},
        pantsImg: {type: 'string', default: '../assets/pants01.png'},
        pantsName: {type: 'string', optional: true},
        pantsColor: {type: 'string', optional: true},
        pantsStyle: {type: 'string', optional: true},
        pantsBrand: {type: 'string', optional: true},
        wearLimit: {type: 'int', default: 6},
        dateAdded: {type: 'date', optional: true},
        lastWorn: {type: 'date', optional: true}
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

export default new Realm({
    schema: [PantsSchema, ColorSchema, StyleSchema, BrandSchema, SettingsSchema]
});