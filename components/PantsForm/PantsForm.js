const React = require('react-native');
const {
    ScrollView,
    StyleSheet,
    Text,
    View
    } = React;
const Button = require('../Button/Button');
const t = require('tcomb-form-native');
const FormText = require('../FormTextInput/FormTextInput.js');
const DB = require('../../db.js');
const DBEvents = require('react-native-db-models').DBEvents;
const PantsWatchStyles = require('../../PantsWatchStyles.js');
const PantsWatchTemplates = require('../../templates/pantsWatchTemplates/');

const Form = t.form.Form;
Form.stylesheet = PantsWatchStyles;
Form.templates = PantsWatchTemplates;

const placeholderTextColor = '#FFFFFF';

const PantsColors = t.enums({
    blue: 'Blue',
    green: 'Green',
    black: 'Black',
    red: 'Red',
    khaki: 'Khaki',
    tan: 'Tan',
    white: 'White'
});

// here we are: define your domain model
const PantsRecord = t.struct({
    name: t.String,             // a required string
    color: t.maybe(t.String),
    // color: t.maybe(PantsColors),
    brand: t.maybe(t.String),   // an optional string
    style: t.maybe(t.String),
    maxWears: t.Number,
    lastWornDate: t.maybe(t.String),
    // addedOnDate: t.maybe(t.String),
    // lastWornDate: t.maybe(t.Date),
    // addedOnDate: t.maybe(t.Date),
    notes: t.maybe(t.String)
});

const pantsOptions = {
    auto: 'placeholders',
    fields: {
        name: {
            error: 'Bro. Name your pants, bro.',
            placeholderTextColor: placeholderTextColor
        },
        color: {
            placeholderTextColor: placeholderTextColor
        },
        brand: {
            placeholderTextColor: placeholderTextColor
        },
        style: {
            placeholderTextColor: placeholderTextColor
        },
        maxWears: {
            placeholder: 'Max Wears',
            error: 'You\'ll need to wash them eventually.',
            placeholderTextColor: placeholderTextColor

        },
        lastWornDate: {
            placeholder: 'Last Worn On',
            mode: 'date',
            placeholderTextColor: placeholderTextColor

        },
        addedOnDate: {
            placeholder: 'Added On',
            mode: 'date',
            placeholderTextColor: placeholderTextColor

        },
        notes: {
            placeholderTextColor: placeholderTextColor
        }
    }
};
const PantsForm = React.createClass({

    propTypes: {
        pantsData: React.PropTypes.object
    },

    getDefaultProps() {
        return null;
    },

    getInitialState: function () {
        return null;
    },

    componentDidMount: function () {
    },

    submitFormData: function () {
        const self = this;
        let pantsForm = this.refs.pantsForm,
            value = pantsForm.getValue();
        console.log(value);

        if (value) {
            DB.pants.add({
                name: value.name,
                color: value.color,
                brand: value.brand,
                style: value.style,
                maxWears: value.maxWears,
                lastWorn: value.lastWornDate,
                addedOn: value.addedOnDate,
                notes: value.notes
            }, function (updatedTable) {
                self.resetForm(pantsForm);
                console.log(updatedTable);
            });
        }
    },

    resetForm: function (targetForm) {
        targetForm.refs.input.setState({value: null});
        targetForm.getComponent('name').refs.input.focus();
    },

    render: function () {
        const white = '#FFFFFF';

        return (
            <ScrollView contentContainerStyle={ styles.formWrapper }>
                <View style={{ borderBottomWidth: 1, borderColor: '#000000', marginBottom: 10 }}>
                    <FormText labelText='Name:' placeholderText='Name Your Pants' />
                </View>
                <Button buttonText="Submit My Pants" onButtonPress={this.submitFormData}/>
            </ScrollView>
        );
    }
});

var styles = StyleSheet.create({
    formWrapper: {
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#0000CC'
    },
    pageTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        borderBottomWidth: 1,
        borderColor: '#000000'
    }
});
/* buttonText: {
 fontSize: 18,
 color: 'white',
 alignSelf: 'center'
 },
 button: {
 height: 36,
 backgroundColor: '#48BBEC',
 borderColor: '#48BBEC',
 borderWidth: 1,
 borderRadius: 8,
 marginBottom: 10,
 alignSelf: 'stretch',
 justifyContent: 'center'
 }
 */

module.exports = PantsForm;

/*
 render() {
 return (
 <Button
 style={{fontSize: 20, color: 'green'}}
 styleDisabled={{color: 'red'}}
 onPress={this._handlePress}
 >
 Press Me!
 </Button>
 );
 },

 _handlePress(event) {
 console.log('Pressed!');
 },

 */
