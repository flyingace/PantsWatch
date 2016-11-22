import React from 'react';
import {
    Button,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';
import t from 'tcomb-form-native';
import _ from 'lodash';
import DB from '../../db.js';
import { DBEvents } from 'react-native-db-models';
import FormText from './FormTextInput';
import PantsListView from './PantsListView';
import PantsWatchStyles from '../styles/PantsWatchStyles.js';
import BackgroundImage from '../../assets/backgrounds/redPlaid.png';
import PageTitle from '../../assets/page_titles/addFormTitle.png';

//TODO: I'm not sure that using state here to hold and pass the form values is really
//the best way to go about doing this. Would it be better to just use a regular object {} ?

const Form = t.form.Form;

const Pants = t.struct({
    pantsName: t.String,
    pantsColor: t.maybe(t.String),
    pantsStyle: t.maybe(t.String),
    pantsBrand: t.maybe(t.String),
    pantsWearLimit: t.Number
});


const PantsForm = React.createClass({

    propTypes: {
        pantsData: React.PropTypes.object,
        validateForm: React.PropTypes.func,
        submitForm: React.PropTypes.func
    },

    getDefaultProps () {
        return {
            pantsImg: null,
            pantsName: null,
            pantsColor: null,
            pantsStyle: null,
            pantsBrand: null,
            pantsWearLimit: 6
        }
    },

    getInitialState () {
        return {
            pantsImg: this.props.pantsImg,
            pantsName: this.props.pantsName,
            pantsColor: this.props.pantsColor,
            pantsStyle: this.props.pantsStyle,
            pantsBrand: this.props.pantsBrand,
            pantsWearLimit: this.props.pantsWearLimit
        };
    },

    componentDidMount() {
    },

    onFormSubmit () {
        // call getValue() to get the values of the form
        const formData = this.refs.form.getValue();
        if (formData) { // if validation fails, value will be null
            console.log(formData);
            this.addPantsToDB(formData);
        }
        //First Step Should Be To Validate
        //Then if validated, to update the database
        //And then to go to the pants list page
        /*
        let {pantsImg, pantsName, pantsColor, pantsStyle, pantsBrand, pantsWearLimit} = this.state;
        let value = {};
        const self = this;

        //TODO: add step for validation

        */
    },

    addPantsToDB (formData) {
        DB.pants.erase_db(function(removed_data){
            console.log(removed_data);
        });

        //break out submission into separate function
        DB.pants.add({
            name: formData.pantsName,
            color: formData.pantsColor,
            brand: formData.pantsBrand,
            style: formData.pantsStyle,
            maxWears: formData.pantsWearLimit,
            // lastWorn: value.lastWornDate,
            // addedOn: value.addedOnDate,
            // notes: value.notes
        }, () => {
            this.resetForm();
            this.navigateToPantsList();
        });
    },

    resetForm () {
        //this can be done with t.comb
        let stateObject = this.state;
        const self = this;
        _.forEach(stateObject, function(n, key) {
            self.setState({key: null});
        })
    },

    navigateToPantsList () {
        //TODO: Add check to see if "add multiple pairs of pants" is checked and
        //if yes, do not navigate away but reset focus to first field.
        //TODO: Add Flux architecture to handle updating the navigator, no?
        this.props.navigator.replace({component: PantsListView, name: 'Choose Pants'});
    },
    render () {
        // let {pantsName, pantsColor, pantsStyle, pantsBrand, pantsWearLimit} = this.state;

        return (
            <View>
                <Image source={BackgroundImage} style={styles.backgroundImage}/>
                <ScrollView contentContainerStyle={ styles.formWrapper } style={ styles.transparent }>
                    <Image source={PageTitle} style={styles.pageTitle} resizeMode={'contain'}/>
                    <Text style={styles.formTitle}>Add Some Pants</Text>
                    <Form
                        ref="form"
                        type={Pants}
                    />
                    <Button
                        onPress={this.onFormSubmit}
                        title="Submit My Pants"
                        color="#66d8ff"
                        accessibilityLabel="Add your pants to the database"
                    />
                </ScrollView>
            </View>
        );
    }
});

const styles = StyleSheet.create({
    transparent: {
        backgroundColor: 'rgba(0,0,0,0)'
    },
    backgroundImage: {
        flex: 1,
        position: 'absolute'
    },
    formWrapper: {
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: 'rgba(0,0,0,0)'
    },
    pageTitle: {
        marginTop: 12,
        alignSelf: 'center',
        resizeMode: 'contain',
    },
    formTitle: {
        fontFamily: 'HappyFox-Condensed',
        fontSize: 45,
        color: '#FFFFFF',
        borderBottomWidth: 1,
        borderColor: '#000000'
    }
});

module.exports = PantsForm;