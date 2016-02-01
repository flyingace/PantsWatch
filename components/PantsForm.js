const React = require('react-native');
const {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Image
    } = React;
const _ = require('lodash');
const Button = require('./Button');
const FormText = require('./FormTextInput');
const PantsListView = require('./PantsListView');
const DB = require('../db.js');
const DBEvents = require('react-native-db-models').DBEvents;
const PantsWatchStyles = require('../PantsWatchStyles.js');
const BackgroundImage = require('../assets/backgrounds/redPlaid.png');
const PageTitle = require('../assets/page_titles/addFormTitle.png');

//TODO: I'm not sure that using state here to hold and pass the form values is really
//the best way to go about doing this. Would it be better to just use a regular object {} ?


const PantsForm = React.createClass({

    propTypes: {
        pantsData: React.PropTypes.object
    },

    getDefaultProps() {
        return {
            pantsName: null,
            pantsColor: null,
            pantsStyle: null,
            pantsBrand: null,
            pantsWearLimit: null
        }
    },

    getInitialState: function () {
        return {
            pantsName: this.props.name,
            pantsColor: this.props.pantsColor,
            pantsStyle: this.props.pantsStyle,
            pantsBrand: this.props.pantsBrand,
            pantsWearLimit: this.props.pantsWearLimit
        };
    },

    componentDidMount: function () {
    },

    submitFormData: function () {
        let {pantsName, pantsColor, pantsStyle, pantsBrand, pantsWearLimit} = this.state;
        let value = {};
        const self = this;

        //add step for validation

        //break out submission into separate function
        DB.pants.add({
            name: pantsName,
            color: pantsColor,
            brand: pantsBrand,
            style: pantsStyle,
            maxWears: pantsWearLimit,
            lastWorn: value.lastWornDate,
            addedOn: value.addedOnDate,
            notes: value.notes
        }, function (updatedTable) {
            self.resetForm();
            self.navigateToPantsList();
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

    navigateToPantsList: function () {
        //TODO: Add check to see if "add multiple pairs of pants" is checked and
        //if yes, do not navigate away but reset focus to first field.
        //TODO: Add Flux architecture to handle updating the navigator, no?
        this.props.navigator.replace({component: PantsListView, name: 'Choose Pants'});
    },
    render: function () {
        let {pantsName, pantsColor, pantsStyle, pantsBrand, pantsWearLimit} = this.state;

        return (
            <View>
                <Image source={BackgroundImage} style={styles.backgroundImage}/>
                <ScrollView contentContainerStyle={ styles.formWrapper } style={ styles.transparent }>
                    <Image source={PageTitle} style={styles.pageTitle} resizeMode={'contain'}/>
                    <Text style={styles.formTitle}>Add Some Pants</Text>
                    <FormText
                        labelText='Name:'
                        placeholderText='Name Your Pants'
                        inputRef='pantsName'
                        value={pantsName}
                        onChangeTxt={text => this.setState({pantsName: text})}
                    />

                    <FormText
                        labelText='Color:'
                        placeholderText='Pick A Color'
                        inputRef='color'
                        value={pantsColor}
                        onChangeTxt={text => this.setState({pantsColor: text})}
                    />
                    <FormText
                        labelText='Style:'
                        placeholderText='Pick A Style'
                        inputRef='style'
                        value={pantsStyle}
                        onChangeTxt={text => this.setState({pantsStyle: text})}
                    />
                    <FormText
                        labelText='Brand:'
                        placeholderText='Pick A Brand'
                        inputRef='brand'
                        value={pantsBrand}
                        onChangeTxt={text => this.setState({pantsBrand: text})}
                    />
                    <FormText
                        labelText='Wear Limit:'
                        placeholderText='6'
                        inputRef='wearLimit'
                        value={pantsWearLimit}
                        onChangeTxt={text => this.setState({pantsWearLimit: text})}
                    />
                    <Button buttonText="Submit My Pants" onButtonPress={this.submitFormData}/>
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
