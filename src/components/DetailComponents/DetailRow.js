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

    //TODO: Fix this broke-ass function name
    optionallyAddAddOption = (data) => {
        if (data.length > 0 && data[data.length - 1].val !== 'add') {
            data.push({ _id: 0, key: `add${this.props.label}`, label: '+ Add to this list', val: 'add' })
        }

        return data;
    };

    render() {
        const data = (this.props.data) ? this.props.data : [];
        const menuValues = this.optionallyAddAddOption(data);

        return (
            <View>
                <ModalSelector
                    data={menuValues}
                    initValue="Select something yummy!"
                    onChange={this.onValueChange}
                    disabled={!this.props.behavesAsForm}>
                    <DetailAttribute {...this.props}/>
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