/*globals */

import React, {
    StyleSheet,
    Text,
    View
} from 'react-native';

import DropDown, {
    Select,
    OptionList
} from 'react-native-dropdown';

const FormDropDown = React.createClass({

    displayName: 'FormItem',

    propTypes: {
        labelText: React.PropTypes.string,
        menuOptions: React.PropTypes.array,
        defaultValue: React.PropTypes.string
    },

    getDefaultProps() {
        return {
            itemType: 'textInput'
        };
    },

    _getOptionList() {
        return this.refs.OPTIONLIST;
    },

    render() {
        return (
            <View style={styles.formItemWrapper}>
                <Text style={styles.formLabel}>{this.props.labelText}</Text>
                <Select style={styles.dropDownMenu}
                        defaultValue={this.props.defaultValue}
                        optionListRef={this._getOptionList.bind(this)}>
                    <option>Alabama</option>
                    <option>Alaska</option>
                    <option>Arizona</option>
                    <option>Arkansas</option>
                    <option>California</option>
                    <option>Colorado</option>
                    <option>Connecticut</option>
                    <option>Delaware</option>
                    <option>District Of Columbia</option>
                    <option>Florida</option>
                    <option>Georgia</option>
                    <option>Hawaii</option>
                    <option>Idaho</option>
                    <option>Illinois</option>
                    <option>Indiana</option>
                </Select>

                <OptionList ref="OPTIONLIST"/>
            </View>
        );
    }
});

var styles = StyleSheet.create({
    formItemWrapper: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        alignSelf: 'stretch'
    },
    formLabel: {},
    dropDownMenu: {
        backgroundColor: '#FF00FF',
        width: 300,
        height: 50
    },
});

module.exports = FormDropDown;

/*
<Select
    width={250}
    ref="SELECT2"
    optionListRef={this._getOptionList.bind(this)}
    defaultValue="Select a State in USA ..."
    onSelect={this._usa.bind(this)}>
    <option>Alabama</option>
    <option>Alaska</option>
    <option>Arizona</option>

</Select>
*/
