var React = require('react-native');
const {
    StyleSheet,
    Text,
    TextInput,
    View
    } = React;
const Button = require('../Button/Button');
const FormTextInput = require('../FormTextInput/FormTextInput');
const FormDropDown = require('../FormDropDown/FormDropDown');
const DB = require('../../db.js');
const DBEvents = require('react-native-db-models').DBEvents;

// const pantsData = { name: '', color: '', brand: '', style: '', maxWears: '', addedOn: '', notes: '' };


const PantsForm = React.createClass({

    propTypes: {
        pantsData: React.PropTypes.object
    },

    // pantsData: { name: '', color: '', brand: '', style: '', maxWears: '', addedOn: '', notes: '' },

    getDefaultProps() {
        return null;
    },

    getInitialState: function () {
        return {
            pantsName: '',
            pantsColor: '',
            pantsBrand: '',
            pantsStyle: '',
            maxWears: '',
            lastWornDate: '',
            addedOnDate: '',
            notes: ''
        };
    },

    resetDefaultState: function () {
        this.setState({
            pantsName: '',
            pantsColor: '',
            pantsBrand: '',
            pantsStyle: '',
            maxWears: '',
            lastWornDate: '',
            addedOnDate: '',
            notes: ''
        });
    },

    componentDidMount: function () {
    },

    submitFormData: function () {
        DB.pants.add({
            name: this.state.pantsName,
            color: this.state.pantsColor,
            brand: this.state.pantsBrand,
            style: this.state.pantsStyle,
            maxWears: this.state.maxWears,
            lastWorn: this.state.lastWornDate,
            addedOn: this.state.addedOnDate,
            notes: this.state.notes
        }, function (updatedTable) {
            console.log(updatedTable);
            this.resetDefaultState();
        });
    },

    render: function () {
        return (
            <View style={ styles.formWrapper }>
                <Text style={styles.formLabel}>Name</Text>
                <TextInput style={ styles.textInput } ref='pantsName'
                           onChangeText={(pantsName) => this.setState({ pantsName })}
                           value={this.state.pantsName} defaultValue='What do you want to call your pants?'/>

                <Text style={styles.formLabel}>Color</Text>
                <TextInput style={ styles.textInput } ref='pantsColor'
                           onChangeText={(pantsColor) => this.setState({ pantsColor })}
                           value={this.state.pantsColor} defaultValue='What color are your pants?'/>

                <Text style={styles.formLabel}>Brand</Text>
                <TextInput style={ styles.textInput } ref='pantsBrand'
                           onChangeText={(pantsBrand) => this.setState({ pantsBrand })}
                           value={this.state.pantsBrand} defaultValue='What brand are your pants?'/>

                <Text style={styles.formLabel}>Style</Text>
                <TextInput style={ styles.textInput } ref='pantsStyle'
                           onChangeText={(pantsStyle) => this.setState({ pantsStyle })}
                           value={this.state.pantsStyle} defaultValue='What style are your pants?'/>

                <Text style={styles.formLabel}>Max Wears</Text>
                <TextInput style={ styles.textInput } ref='maxWears'
                           onChangeText={(maxWears) => this.setState({ maxWears })}
                           value={this.state.maxWears}/>

                <Text style={styles.formLabel}>Last Worn On</Text>
                <TextInput style={ styles.textInput } ref='lastWornDate'
                           onChangeText={(lastWornDate) => this.setState({ lastWornDate })}
                           value={this.state.lastWornDate}/>

                <Text style={styles.formLabel}>Added On</Text>
                <TextInput style={ styles.textInput } ref='addedOnDate'
                           onChangeText={(addedOnDate) => this.setState({ addedOnDate })}
                           value={this.state.addedOnDate}/>

                <Text style={styles.formLabel}>Notes</Text>
                <TextInput style={ styles.textInput } ref='Notes'
                           onChangeText={(notes) => this.setState({ notes })}
                           value={this.state.notes}/>

                <Button buttonText="Submit Your Pants" onButtonPress={this.submitFormData}/>
            </View>
        );
    }
});

var styles = StyleSheet.create({
    formWrapper: {
        backgroundColor: '#000FFF',
        flexDirection: 'column',
        alignItems: 'stretch',
        alignSelf: 'stretch'
    },
    formLabel: {
        height: 30,
        backgroundColor: '#CCCCCC',
        alignSelf: 'stretch'
    },
    textInput: {
        backgroundColor: '#DDDDDD',
        height: 30
    }
});

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
