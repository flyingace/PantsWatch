import React, {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';
import t from 'tcomb-form-native';

import { forEach } from 'lodash';
import Button from './Button';
import Landing from './Landing';
import realm from './realm.js';
import PantsWatchStyles from '../PantsWatchStyles.js';
import BackgroundImage from '../assets/backgrounds/redPlaid.png';
import PageTitle from '../assets/page_titles/addFormTitle.png';

//TODO: I'm not sure that using state here to hold and pass the form values is really
//the best way to go about doing this. Would it be better to just use a regular object {} ?

const Settings = React.createClass({

    propTypes: {
        pantsData: React.PropTypes.object
    },

    getDefaultProps() {
        return {
            defaultWearLimit: 6,
            promptWhich: true,
            promptTime: '0900',
            promptRepeat: true,
            promptRepeatInterval: 60,
            outOfPantsWarning: true
        }
    },

    getInitialState() {
        return {
            defaultWearLimit: this.props.defaultWearLimit,
            promptWhich: this.props.promptWhich,
            promptTime: this.props.promptTime,
            promptRepeat: this.props.promptRepeat,
            promptRepeatInterval: this.props.promptRepeatInterval,
            outOfPantsWarning: this.props.outOfPantsWarning
        };
    },

    componentDidMount() {
    },

    onTimeFocus() {
        alert('this should be a date picker revealing itself')
    },
    
    submitFormData() {
        let { defaultWearLimit, promptWhich, promptTime, promptRepeat, promptRepeatInterval, outOfPantsWarning } = this.state;
        let value = {};

        realm.addListener('change', function(e) {
            console.log(e);
        });

        //TODO: add step for validation

        //add primary keys and change this to an update in order to keep only one set of values
        realm.write(() => {
            realm.create('Settings', {
                defaultWearLimit: defaultWearLimit,
                promptWhich: promptWhich,
                promptTime: promptTime,
                promptRepeat: promptRepeat,
                promptRepeatInterval: promptRepeatInterval,
                outOfPantsWarning: outOfPantsWarning
                // }, function (updatedTable) {
                //     self.resetForm();
                //     self.navigateToMainScreen();
                //     console.log(updatedTable);
            });
        });
    },

    resetForm() {
        let stateObject = this.state;
        const self = this;
        forEach(stateObject, function(n, key) {
            self.setState({key: null});
        })
    },

    navigateToMainScreen() {
        //TODO: Add check to see if "add multiple pairs of pants" is checked and
        //if yes, do not navigate away but reset focus to first field.
        //TODO: Add Flux architecture to handle updating the navigator, no?
        this.props.navigator.replace({component: Landing, name: 'Home'});
    },

    render() {
        const Form = t.form.Form;
        let {settingsDefaultWearLimit, settingsWhichPrompt, settingsRepeatPrompt, settingsPromptTime, outOfPantsWarning} = this.state;
        const settingsForm = t.struct({
            defaultWearLimit: t.Number,
            // promptWhich: t.Boolean,
            promptTime: t.String,
            promptRepeat: t.Boolean,
            // promptRepeatInterval: t.Number,
            outOfPantsWarning: t.Boolean
        });

        let settingsOptions = {
            fields: {
                promptTime: {
                    onFocus: () => {
                        this.onTimeFocus();
                    }
                }
            }
            //The options that convert the settingsPromptTime to a time will go here
        };

        return (
            <View>
                <Image source={BackgroundImage} style={styles.backgroundImage}/>
                <ScrollView contentContainerStyle={ styles.formWrapper } style={ styles.transparent }>
                    <Image source={PageTitle} style={styles.pageTitle} resizeMode={'contain'}/>
                    <Text style={styles.formTitle}>Settings</Text>
                    <Form ref='settingsForm'
                          type={settingsForm}
                          options={settingsOptions}
                    />
                    <Button buttonText="Save" onButtonPress={this.submitFormData}/>
                </ScrollView>
            </View>
        );
    }
});

var styles = StyleSheet.create({
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
module.exports = Settings;