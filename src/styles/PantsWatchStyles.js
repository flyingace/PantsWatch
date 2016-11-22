/*

 a bootstrap like style

 */
'use strict';

const LABEL_COLOR = '#000000';
const INPUT_COLOR = '#000000';
const ERROR_COLOR = '#FF0000';
const HELP_COLOR = '#999999';
const BORDER_COLOR = '#CCCCCC';
const DISABLED_COLOR = '#777777';
const DISABLED_BACKGROUND_COLOR = '#EEEEEE';
const FONT_SIZE = 17;
const ERROR_FONT_SIZE = 12;
const FONT_WEIGHT = '500';
const LIGHT_BLUE = '#668fff';
const LIGHT_RED = '#FFF5F5';
const DARK_BLUE = '#001966';

const stylesheet = Object.freeze({
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
