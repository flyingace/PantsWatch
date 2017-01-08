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
import {DBEvents} from 'react-native-db-models';
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

const options = {
    fields: {
        pantsName: {
            // stylesheet: myCustomStylesheet,
            label: 'Name:'
        },
        pantsColor: {
            label: 'Color:'
        },
        pantsStyle: {
            label: 'Style:'
        },
        pantsBrand: {
            label: 'Brand:'
        },
        pantsWearLimit: {
            label: 'Wear Limit:'
        }
    }
};


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
            pantsWearCount: 0,
            pantsWearLimit: null
        }
    },

    getInitialState () {
        return {
            pantsImg: this.props.pantsImg,
            pantsName: this.props.pantsName,
            pantsColor: this.props.pantsColor,
            pantsStyle: this.props.pantsStyle,
            pantsBrand: this.props.pantsBrand,
            pantsWearCount: this.props.pantsWearCount,
            pantsWearLimit: this.props.pantsWearLimit
        };
    },

    componentDidMount() {
    },

    onFormSubmit () {
        //First Step Should Be To Validate
        //Then if validated, to update the database
        //And then to go to the pants list page

        // call getValue() to get the values of the form
        const formData = this.refs.form.getValue();
        if (formData) { // if validation fails, value will be null
            console.log(formData);
            this.addPantsToDB(formData);
        }
    },

    addPantsToDB (formData) {
        DB.pants.add({
            pantsName: formData.pantsName,
            pantsColor: formData.pantsColor,
            pantsBrand: formData.pantsBrand,
            pantsStyle: formData.pantsStyle,
            pantsWearCount: 0,
            pantsWearLimit: formData.pantsWearLimit,
            lastWornDate: ''
            // addedOn: value.addedOnDate,
            // notes: value.notes
        }, () => {
            this.resetForm();
            this.navigateToPantsList();
        });
    },

    resetForm () {
        this.setState({value: null});
    },

    navigateToPantsList () {
        //TODO: Add check to see if "add multiple pairs of pants" is checked and
        //if yes, do not navigate away but reset focus to first field.
        this.props.navigator.replace({component: PantsListView, name: 'Choose Pants'});
    },
    render () {

        return (
            <View>
                <Image source={BackgroundImage} style={styles.backgroundImage}/>
                <ScrollView contentContainerStyle={ styles.formWrapper } style={ styles.transparent }>
                    <Image source={PageTitle} style={styles.pageTitle} resizeMode={'contain'}/>
                    <Text style={styles.formTitle}>Add Some Pants</Text>
                    <Form
                        ref="form"
                        type={Pants}
                        options={options}
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