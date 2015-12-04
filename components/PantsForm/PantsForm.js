var React = require('react-native');
const {
    ScrollView,
    StyleSheet,
    Text,
    View
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
        name: {
            error: 'Please choose a name for your pants.'
        },
        maxWears: {
            label: 'Max Wears',
            error: 'Please choose how many times you want to wear these pants before they need to be washed.'
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
        return (
            <ScrollView contentContainerStyle={ styles.formWrapper }>
                <View style={{ borderBottomWidth: 1, borderColor: '#000000', marginBottom: 10 }}>
                    <Text style={styles.pageTitle}>Add Some Pants To Your Life</Text>
                </View>
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
