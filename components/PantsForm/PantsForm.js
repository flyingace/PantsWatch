var React = require('react-native');
const {
    ScrollView,
    StyleSheet
    } = React;
const Button = require('../Button/Button');
const t = require('tcomb-form-native');
const DB = require('../../db.js');
const DBEvents = require('react-native-db-models').DBEvents;

var Form = t.form.Form;

var PantsColors = t.enums({
    blue: 'Blue',
    green: 'Green',
    black: 'Black',
    red: 'Red',
    khaki: 'Khaki',
    tan: 'Tan',
    white: 'White'
});

// here we are: define your domain model
var PantsRecord = t.struct({
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

var pantsOptions = {
    //auto: 'placeholders',
    fields: {
        maxWears: {
            label: 'Max Wears'
        },
        lastWornDate: {
            label: 'Last Worn On',
            mode: 'date'
        },
        addedOnDate: {
            label: 'Added On',
            mode: 'date'
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
        var value = this.refs.pantsForm.getValue();
        console.log(value);
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
            console.log(updatedTable);
        });
    },

    render: function () {
        return (
            <ScrollView contentContainerStyle={ styles.formWrapper }>
                <Form
                    ref='pantsForm'
                    type={PantsRecord}
                    options={pantsOptions}
                />
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
        backgroundColor: '#ffffff'
    },
    title: {
        fontSize: 30,
        alignSelf: 'center',
        marginBottom: 5
    },
    textInput: {
        backgroundColor: '#DDDDDD',
        height: 30
    },
    button: {
        height: 30
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
