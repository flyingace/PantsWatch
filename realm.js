'use strict';

import Realm from 'realm';

class Pants {}
Pants.schema = {
    name: 'Pants',
    primaryKey: 'id',
    properties: {
        id: 'int',
        pantsImg: {type: 'string', default: "../assets/pants01.png"},
        pantsName: 'string',
        pantsColor: 'Color',
        pantsStyle: 'Style',
        pantsBrand: 'Brand',
        wearLimit: {type: 'int', default: 6},
        dateAdded: 'date',
        lastWorn: 'date'
    },
};
class Color {}
Color.schema = {
    name: 'Color',
    primaryKey: 'id',
    properties: {
        id: 'int',
        styleName: 'string'
    }
};
class Style {}
Style.schema = {
    name: 'Style',
    primaryKey: 'id',
    properties: {
        id: 'int',
        styleName: 'string'
    },
};
class Brand {}
Brand.schema = {
    name: 'Brand',
    primaryKey: 'id',
    properties: {
        id: 'int',
        brandName: 'string'
    },
};
class Settings {}
Settings.schema = {
    name: 'Settings',
    properties: {
        defaultWearLimit: {type: 'int', default: 6},
        promptWhich: {type: 'bool', default: true},
        promptTime: {type: 'date', default: true},
        promptRepeat: {type: 'bool', default: true},
        promptRepeatInterval: {type: 'int', default: 30},
        outOfPantsWarning: {type: 'bool', default: true},
    },
};
export default new Realm({schema: [Pants, Color, Style, Brand, Settings]});