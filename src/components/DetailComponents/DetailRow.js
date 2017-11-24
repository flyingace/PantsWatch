import React from 'react';
import PropTypes from 'prop-types';
import {
    Text,
    View
} from 'react-native';
import { DetailAttribute } from './DetailComponents';
import ModalSelector from 'react-native-modal-selector';
import { OptionallyDisplayed } from '../FormComponents/FormComponents';

class DetailRow extends React.Component {
    constructor() {
        super();
    };

    static propTypes = {
        showError: PropTypes.bool,
        errorText: PropTypes.string
    };

    static defaultProps = {
        showError: false,
        errorText: ''
    };

    state = {};

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    onValueChange(value) {
        if (value !== 'add') {
            this.props.setFieldValue(value);
        } else {
            this.props.onAddOption(this.props.fieldName);
        }
    }

    shouldDisplayError() {
        return this.props.showError && this.props.errorText !== '';
    }

    render() {
        const data = (data) ? this.props.menuOptions.rows : [];
        if (data) data.push({_id: 0, key: `add${this.props.label}`, label: '+ Add to this list', value: 'add'});

        return (
            <View>
                <ModalSelector
                    data={data}
                    initValue="Select something yummy!"
                    onChange={this.onValueChange}>
                    <DetailAttribute label={this.props.label} icon={this.props.icon} value={this.props.value} hex={this.props.hex} menuOptions={this.props.data} />
                </ModalSelector>
                <OptionallyDisplayed display={this.shouldDisplayError()}>
                    <View>
                        <Text>{this.props.errorText}</Text>
                    </View>
                </OptionallyDisplayed>
            </View>
        );
    }
}

module.exports = DetailRow;