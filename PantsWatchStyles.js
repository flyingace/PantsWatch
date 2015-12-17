/*

 a bootstrap like style

 */
'use strict';

var LABEL_COLOR = '#000000';
var INPUT_COLOR = '#000000';
var ERROR_COLOR = '#FF0000';
var HELP_COLOR = '#999999';
var BORDER_COLOR = '#CCCCCC';
var DISABLED_COLOR = '#777777';
var DISABLED_BACKGROUND_COLOR = '#EEEEEE';
var FONT_SIZE = 17;
var ERROR_FONT_SIZE = 12;
var FONT_WEIGHT = '500';
var LIGHT_BLUE = '#668fff';
var LIGHT_RED = '#FFF5F5';
var DARK_BLUE = '#001966';

var stylesheet = Object.freeze({
    fieldset: {},
    // the style applied to the container of all inputs
    formGroup: {
        normal: {
            marginBottom: 20,
            borderColor: BORDER_COLOR
        },
        error: {
            marginBottom: 2,
            borderColor: ERROR_COLOR
        }
    },
    controlLabel: {
        normal: {
            color: LABEL_COLOR,
            fontSize: FONT_SIZE,
            marginBottom: 7,
            fontWeight: 44
        },
        // the style applied when a validation error occurs
        error: {
            color: ERROR_COLOR,
            fontSize: FONT_SIZE,
            marginBottom: 7,
            fontWeight: FONT_WEIGHT
        }
    },
    helpBlock: {
        normal: {
            color: HELP_COLOR,
            fontSize: ERROR_FONT_SIZE,
            marginBottom: 2
        },
        // the style applied when a validation error occurs
        error: {
            color: HELP_COLOR,
            fontSize: ERROR_FONT_SIZE,
            marginBottom: 2
        }
    },
    errorBlock: {
        fontSize: ERROR_FONT_SIZE,
        color: ERROR_COLOR,
        marginBottom: 10
    },
    textbox: {
        normal: {
            color: INPUT_COLOR,
            fontSize: FONT_SIZE,
            height: 36,
            padding: 7,
            backgroundColor: LIGHT_BLUE,
            borderRadius: 4
        },
        // the style applied when a validation error occurs
        error: {
            color: INPUT_COLOR,
            fontSize: FONT_SIZE,
            height: 36,
            padding: 7,
            backgroundColor: LIGHT_RED,
            borderRadius: 4
        },
        // the style applied when the textbox is not editable
        notEditable: {
            fontSize: FONT_SIZE,
            height: 36,
            padding: 7,
            borderRadius: 4,
            borderColor: BORDER_COLOR,
            borderWidth: 1,
            marginBottom: 5,
            color: DISABLED_COLOR,
            backgroundColor: DISABLED_BACKGROUND_COLOR
        }
    },
    checkbox: {
        normal: {
            color: INPUT_COLOR,
            marginBottom: 4
        },
        // the style applied when a validation error occurs
        error: {
            color: INPUT_COLOR,
            marginBottom: 4
        }
    },
    select: {
        normal: {
            marginBottom: 4
        },
        // the style applied when a validation error occurs
        error: {
            marginBottom: 4
        }
    },
    datepicker: {
        normal: {
            marginBottom: 4
        },
        // the style applied when a validation error occurs
        error: {
            marginBottom: 4
        }
    }
});

module.exports = stylesheet;
