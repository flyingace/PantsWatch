const React = require('react-native');
const t = require('tcomb-form-native');
const Form = t.form.Form;

const {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Image
} = React;
const _ = require('lodash');
const Button = require('./Button');
const Landing = require('./Landing');
const realm = require('../realm.js');
const PantsWatchStyles = require('../PantsWatchStyles.js');
const BackgroundImage = require('../assets/backgrounds/redPlaid.png');
const PageTitle = require('../assets/page_titles/addFormTitle.png');

//TODO: I'm not sure that using state here to hold and pass the form values is really
//the best way to go about doing this. Would it be better to just use a regular object {} ?

const settingsForm = t.struct({
    settingsDefaultWearLimit: t.Number,
    settingsWhichPrompt: t.Boolean,
    settingsRepeatPrompt: t.Boolean,
    settingsPromptTime: t.String,
    settingsOutOfPantsWarning: t.Boolean
});

const settingsOptions = {
    fields: {
        settingsPromptTime: {
            onFocus: this.onTimeFocus().bind(this)
        }
    }
    //The options that convert the settingsPromptTime to a time will go here
}


const Settings = React.createClass({

    propTypes: {
        pantsData: React.PropTypes.object
    },

    getDefaultProps() {
        return {
            settingsDefaultWearLimit: '6',
            settingsWhichPrompt: 'true',
            settingsRepeatPrompt: 'true',
            settingsPromptTime: '0900',
            settingsOutOfPantsWarning: 'true'
        }
    },

    getInitialState: function () {
        return {
            settingsDefaultWearLimit: this.props.settingsDefaultWearLimit,
            settingsWhichPrompt: this.props.settingsWhichPrompt,
            settingsRepeatPrompt: this.props.settingsRepeatPrompt,
            settingsPromptTime: this.props.settingsPromptTime,
            settingsOutOfPantsWarning: this.props.settingsOutOfPantsWarning
        };
    },

    componentDidMount: function () {
    },

    onTimeFocus: function () {
        alert('this should be a date picker revealing itself')
    },


    submitFormData: function () {
        let {settingsDefaultWearLimit, settingsWhichPrompt, settingsRepeatPrompt, settingsPromptTime, settingsOutOfPantsWarning} = this.state;
        let value = {};
        const self = this;

        //TODO: add step for validation

        //TODO: break out submission into separate function
        DB.settings.add({
            settingsDefaultWearLimit: settingsDefaultWearLimit,
            settingsWhichPrompt: settingsWhichPrompt,
            settingsPromptTime: settingsPromptTime,
            settingsRepeatPrompt: settingsRepeatPrompt,
            settingsOutOfPantsWarning: settingsOutOfPantsWarning
        }, function (updatedTable) {
            self.resetForm();
            self.navigateToMainScreen();
            console.log(updatedTable);
        });
    },

    resetForm: function () {
        let stateObject = this.state;
        const self = this;
        _.forEach(stateObject, function(n, key) {
            self.setState({key: null});
        })
    },

    navigateToMainScreen: function () {
        //TODO: Add check to see if "add multiple pairs of pants" is checked and
        //if yes, do not navigate away but reset focus to first field.
        //TODO: Add Flux architecture to handle updating the navigator, no?
        this.props.navigator.replace({component: Landing, name: 'Home'});
    },

    render: function () {
        let {settingsDefaultWearLimit, settingsWhichPrompt, settingsRepeatPrompt, settingsPromptTime, settingsOutOfPantsWarning} = this.state;

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